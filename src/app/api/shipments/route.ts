import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createShipmentSchema } from '@/lib/validators';
import { checkComplianceRAG } from '@/lib/services/agentService';
import { runFraudScan } from '@/lib/services/fraudDetectionService';
import { successResponse, errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
    try {
        const shipments = await prisma.shipment.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                batch: { include: { product: true, farmer: true } },
                exporter: true,
                complianceChecks: true,
                fraudAlerts: true,
            },
        });

        return successResponse(shipments);
    } catch (error: any) {
        console.error('Error fetching shipments:', error);
        return errorResponse('Failed to fetch shipments', 'SERVER_ERROR', 500);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validated = createShipmentSchema.parse(body);

        const batch = await prisma.batch.findFirst({
            where: { OR: [{ id: validated.batchId }, { batchCode: validated.batchId }] },
        });

        if (!batch) {
            return errorResponse('Batch not found', 'BATCH_NOT_FOUND', 404);
        }

        let exporter = await prisma.user.findFirst({ where: { role: 'EXPORTER' } });
        if (!exporter) exporter = await prisma.user.findFirst();

        const count = await prisma.shipment.count();
        const shipmentCode = `EX-${1924 + count}`;

        const newShipment = await prisma.shipment.create({
            data: {
                shipmentCode,
                batchId: batch.id,
                exporterId: exporter!.id,
                destinationCountry: validated.destinationCountry,
                quantity: validated.quantity,
                status: 'In Transit',
                riskScore: 15,
            },
            include: { batch: { include: { product: true } } },
        });

        // Run Compliance RAG checks automatically for destination country
        const ragRes = await checkComplianceRAG(validated.destinationCountry, batch.batchCode);
        for (const check of ragRes.checks) {
            await prisma.complianceCheck.create({
                data: {
                    shipmentId: newShipment.id,
                    country: check.country,
                    requirement: check.requirement,
                    status: check.status,
                    explanation: check.explanation,
                    source: check.source,
                },
            });
        }

        // Add supply chain event EXPORTED
        await prisma.supplyChainEvent.create({
            data: {
                batchId: batch.id,
                eventType: 'EXPORTED',
                actorId: exporter!.id,
                location: `Port of Export (Dest: ${validated.destinationCountry})`,
                metadata: `Shipment ${shipmentCode} created for ${validated.quantity} kg`,
            },
        });

        // Run Fraud Detection
        const fraudAlerts = await runFraudScan(batch.id, newShipment.id);

        return successResponse({
            shipment: newShipment,
            complianceSummary: ragRes.summary,
            fraudAlerts,
        }, 201);
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return errorResponse(error.errors[0]?.message || 'Validation failed', 'VALIDATION_ERROR', 400);
        }
        console.error('Create shipment error:', error);
        return errorResponse(error.message || 'Failed to create shipment', 'SERVER_ERROR', 500);
    }
}
