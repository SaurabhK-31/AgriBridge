import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyBatchOnChain } from '@/lib/blockchain';
import { calculateTrustScore } from '@/lib/services/trustScoreService';
import { successResponse, errorResponse } from '@/lib/response';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const batch = await prisma.batch.findFirst({
            where: {
                OR: [{ id }, { batchCode: id }],
            },
            include: {
                farmer: { include: { farmerProfile: true } },
                product: true,
                certificates: true,
                events: { orderBy: { timestamp: 'asc' } },
                shipments: { include: { complianceChecks: true } },
                fraudAlerts: true,
                trustScoreDetails: true,
                temperatureLogs: true,
            },
        });

        if (!batch) {
            return errorResponse(`Batch '${id}' not found`, 'NOT_FOUND', 404);
        }

        // Verify cryptographic SHA-256 on blockchain
        const chainVerification = await verifyBatchOnChain(batch.batchCode, batch.blockchainHash);

        // Calculate fresh Trust Score
        const trustDetails = await calculateTrustScore(batch.id);

        return successResponse({
            batch,
            blockchainVerification: chainVerification,
            trustDetails,
        });
    } catch (error: any) {
        console.error('Error fetching batch detail:', error);
        return errorResponse('Failed to fetch batch details', 'SERVER_ERROR', 500);
    }
}
