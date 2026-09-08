import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { certificateUploadSchema } from '@/lib/validators';
import { runFraudScan } from '@/lib/services/fraudDetectionService';
import { calculateTrustScore } from '@/lib/services/trustScoreService';
import { successResponse, errorResponse } from '@/lib/response';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validated = certificateUploadSchema.parse(body);

        const batch = await prisma.batch.findFirst({
            where: { OR: [{ id: validated.batchId }, { batchCode: validated.batchId }] },
        });

        if (!batch) {
            return errorResponse('Batch not found', 'BATCH_NOT_FOUND', 404);
        }

        // SHA-256 Duplicate Hash Scan
        const existingCert = await prisma.certificate.findFirst({
            where: { fileHash: validated.fileHash },
            include: { batch: true },
        });

        let verificationStatus = 'VERIFIED';
        let duplicateDetected = false;

        if (existingCert) {
            verificationStatus = 'SUSPICIOUS';
            duplicateDetected = true;
        }

        const certificate = await prisma.certificate.create({
            data: {
                batchId: batch.id,
                certificateType: validated.certificateType,
                fileUrl: validated.fileUrl,
                fileHash: validated.fileHash,
                issuer: validated.issuer,
                issueDate: new Date(),
                expiryDate: new Date(validated.expiryDate),
                verificationStatus,
            },
        });

        // Run Fraud Detection Engine
        const fraudAlerts = await runFraudScan(batch.id);

        // Recalculate Trust Score
        await calculateTrustScore(batch.id);

        return successResponse({
            certificate,
            duplicateDetected,
            fraudAlerts,
            message: duplicateDetected
                ? 'WARNING: Duplicate SHA-256 certificate hash detected! Fraud alert automatically logged for Regulator review.'
                : 'Certificate uploaded and verified successfully.',
        });
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return errorResponse(error.errors[0]?.message || 'Validation failed', 'VALIDATION_ERROR', 400);
        }
        console.error('Certificate upload error:', error);
        return errorResponse(error.message || 'Failed to upload certificate', 'SERVER_ERROR', 500);
    }
}
