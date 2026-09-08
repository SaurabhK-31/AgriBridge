import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createBatchSchema } from '@/lib/validators';
import { generateBatchHash, registerBatchOnChain } from '@/lib/blockchain';
import { calculateTrustScore } from '@/lib/services/trustScoreService';
import { runSupervisorOrchestration } from '@/lib/services/agentService';
import { successResponse, errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q');
        const status = searchParams.get('status');

        const where: any = {};
        if (status) where.status = status;
        if (query) {
            where.OR = [
                { batchCode: { contains: query } },
                { location: { contains: query } },
                { product: { name: { contains: query } } },
            ];
        }

        const batches = await prisma.batch.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                product: true,
                farmer: { select: { name: true, email: true, farmerProfile: true } },
                certificates: true,
                events: true,
                fraudAlerts: true,
            },
        });

        return successResponse(batches);
    } catch (error: any) {
        console.error('Error fetching batches:', error);
        return errorResponse('Failed to fetch crop batches', 'FETCH_ERROR', 500);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validated = createBatchSchema.parse(body);

        // Get default farmer user
        let farmer = await prisma.user.findFirst({
            where: { role: 'FARMER' },
        });

        if (!farmer) {
            farmer = await prisma.user.findFirst();
        }

        if (!farmer) {
            return errorResponse('No registered farmer account found', 'USER_NOT_FOUND', 400);
        }

        // Find or create product
        let product = await prisma.product.findFirst({
            where: { name: { contains: validated.crop } },
        });

        if (!product) {
            product = await prisma.product.create({
                data: {
                    name: validated.crop,
                    category: 'Agriculture',
                    description: `Organic ${validated.crop} harvested locally.`,
                },
            });
        }

        // Generate unique batch code e.g. AG-2850
        const count = await prisma.batch.count();
        const batchCode = `AG-${2848 + count}`;

        // Cryptographic SHA-256 Hash
        const cryptographicHash = generateBatchHash({
            batchCode,
            farmerId: farmer.id,
            crop: validated.crop,
            quantity: validated.quantity,
            harvestDate: validated.harvestDate,
            location: validated.location,
        });

        // Polygon Blockchain Registration
        const chainRes = await registerBatchOnChain(batchCode, cryptographicHash);

        // Save Batch to Database
        const newBatch = await prisma.batch.create({
            data: {
                batchCode,
                farmerId: farmer.id,
                productId: product.id,
                quantity: validated.quantity,
                harvestDate: new Date(validated.harvestDate),
                location: validated.location,
                status: 'Registered',
                blockchainHash: cryptographicHash,
                blockchainTransactionHash: chainRes.transactionHash,
                trustScore: 90,
            },
            include: {
                product: true,
                farmer: true,
            },
        });

        // Record initial FARM_REGISTERED event
        await prisma.supplyChainEvent.create({
            data: {
                batchId: newBatch.id,
                eventType: 'FARM_REGISTERED',
                actorId: farmer.id,
                location: validated.location,
                metadata: `Harvest registered with SHA-256 cryptographic hash`,
                blockchainTransactionHash: chainRes.transactionHash,
            },
        });

        // If initial certificate details provided
        if (validated.certificateUrl) {
            await prisma.certificate.create({
                data: {
                    batchId: newBatch.id,
                    certificateType: validated.certificateType || 'Phytosanitary Certificate',
                    fileUrl: validated.certificateUrl,
                    fileHash: cryptographicHash,
                    issuer: 'FSSAI / APEDA Registered Authority',
                    issueDate: new Date(),
                    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                    verificationStatus: 'VERIFIED',
                },
            });
        }

        // Run Trust Score calculation
        await calculateTrustScore(newBatch.id);

        // Run AI Supervisor Multi-Agent Orchestration
        await runSupervisorOrchestration(newBatch.id);

        return successResponse({
            batch: newBatch,
            blockchain: chainRes,
        }, 201);
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return errorResponse(error.errors[0]?.message || 'Validation failed', 'VALIDATION_ERROR', 400);
        }
        console.error('Create batch error:', error);
        return errorResponse(error.message || 'Failed to create crop batch', 'SERVER_ERROR', 500);
    }
}
