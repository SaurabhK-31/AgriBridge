import { NextRequest } from 'next/server';
import { consumerChatSchema } from '@/lib/validators';
import { answerConsumerQuery } from '@/lib/services/agentService';
import { successResponse, errorResponse } from '@/lib/response';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validated = consumerChatSchema.parse(body);

        const result = await answerConsumerQuery(validated.batchId, validated.query);
        return successResponse(result);
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return errorResponse(error.errors[0]?.message || 'Validation failed', 'VALIDATION_ERROR', 400);
        }
        console.error('Consumer chat error:', error);
        return errorResponse('Failed to answer consumer query', 'SERVER_ERROR', 500);
    }
}
