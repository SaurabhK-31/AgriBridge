import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken, TOKEN_NAME } from '@/lib/auth';
import { registerSchema } from '@/lib/validators';
import { successResponse, errorResponse } from '@/lib/response';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validated = registerSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: { email: validated.email },
        });

        if (existingUser) {
            return errorResponse('User with this email already exists', 'USER_EXISTS', 400);
        }

        const hashedPassword = await hashPassword(validated.password);

        const newUser = await prisma.user.create({
            data: {
                name: validated.name,
                email: validated.email,
                password: hashedPassword,
                role: validated.role,
                phone: validated.phone,
                farmerProfile:
                    validated.role === 'FARMER'
                        ? {
                            create: {
                                farmName: validated.farmName || `${validated.name}'s Farm`,
                                location: validated.location || 'Nashik, Maharashtra',
                                state: validated.state || 'Maharashtra',
                                district: validated.district || 'Nashik',
                            },
                        }
                        : undefined,
            },
            include: {
                farmerProfile: true,
            },
        });

        const token = generateToken({
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
        });

        const response = successResponse({
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                phone: newUser.phone,
                farmerProfile: newUser.farmerProfile,
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
        console.error('Registration error:', error);
        return errorResponse('Internal server error', 'SERVER_ERROR', 500);
    }
}
