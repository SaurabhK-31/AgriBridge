import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken, TOKEN_NAME } from '@/lib/auth';
import { loginSchema } from '@/lib/validators';
import { successResponse, errorResponse } from '@/lib/response';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validated = loginSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: { email: validated.email },
            include: { farmerProfile: true },
        });

        if (!user) {
            return errorResponse('Invalid email or password', 'INVALID_CREDENTIALS', 401);
        }

        const isValid = await comparePassword(validated.password, user.password);
        if (!isValid) {
            return errorResponse('Invalid email or password', 'INVALID_CREDENTIALS', 401);
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        const response = successResponse({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                farmerProfile: user.farmerProfile,
            },
            token,
        });

        response.cookies.set({
            name: TOKEN_NAME,
            value: token,
            httpOnly: true,
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
            sameSite: 'lax',
        });

        return response;
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return errorResponse(error.errors[0]?.message || 'Validation failed', 'VALIDATION_ERROR', 400);
        }
        console.error('Login error:', error);
        return errorResponse('Internal server error', 'SERVER_ERROR', 500);
    }
}
