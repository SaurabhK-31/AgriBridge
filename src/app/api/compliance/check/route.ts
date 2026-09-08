import { NextRequest } from 'next/server';
import { checkComplianceRAG } from '@/lib/services/agentService';
import { successResponse, errorResponse } from '@/lib/response';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { country, batchId } = body;

        if (!country) {
            return errorResponse('Country parameter is required', 'MISSING_PARAM', 400);
        }

        const result = await checkComplianceRAG(country, batchId);
        return successResponse(result);
    } catch (error: any) {
        console.error('Compliance check error:', error);
        return errorResponse('Compliance check failed', 'SERVER_ERROR', 500);
    }
}
