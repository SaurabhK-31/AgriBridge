import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
}

export function successResponse<T>(data: T, status = 200) {
    return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, code = 'BAD_REQUEST', status = 400) {
    return NextResponse.json(
        {
            success: false,
            error: {
                code,
                message,
            },
        },
        { status }
    );
}
