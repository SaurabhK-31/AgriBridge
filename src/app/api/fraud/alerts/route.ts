import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/response';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');

        const where: any = {};
        if (status) where.status = status;

        const alerts = await prisma.fraudAlert.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                batch: { include: { product: true, farmer: true } },
                shipment: true,
            },
        });

        return successResponse(alerts);
    } catch (error: any) {
        console.error('Error fetching fraud alerts:', error);
        return errorResponse('Failed to fetch fraud alerts', 'SERVER_ERROR', 500);
    }
}
