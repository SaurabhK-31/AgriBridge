import { NextRequest } from 'next/server';
import { calculateTrustScore } from '@/lib/services/trustScoreService';
import { successResponse, errorResponse } from '@/lib/response';

export async function GET(req: NextRequest, { params }: { params: Promise<{ batchId: string }> }) {
    try {
        const { batchId } = await params;
        const result = await calculateTrustScore(batchId);
        return successResponse(result);
    } catch (error: any) {
        console.error('Trust score calculation error:', error);
        return errorResponse(error.message || 'Failed to calculate Trust Score', 'SERVER_ERROR', 500);
    }
}
