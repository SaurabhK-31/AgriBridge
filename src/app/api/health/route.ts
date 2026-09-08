import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Check DB connectivity
        await prisma.$queryRaw`SELECT 1`;

        return NextResponse.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            database: 'connected',
            blockchain: process.env.BLOCKCHAIN_MODE || 'mock',
            aiService: 'active',
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                status: 'unhealthy',
                timestamp: new Date().toISOString(),
                error: error.message,
            },
            { status: 500 }
        );
    }
}
