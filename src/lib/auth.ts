import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

const JWT_SECRET = process.env.AUTH_SECRET || 'agribridge-ai-super-secret-jwt-key-2026';
const TOKEN_NAME = 'agribridge_token';

export interface UserPayload {
    id: string;
    email: string;
    name: string;
    role: string;
}

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export function generateToken(payload: UserPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): UserPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as UserPayload;
    } catch {
        return null;
    }
}

export async function getSessionUser(): Promise<UserPayload | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(TOKEN_NAME)?.value;
        if (!token) return null;
        return verifyToken(token);
    } catch {
        return null;
    }
}

export async function getFullSessionUser() {
    const payload = await getSessionUser();
    if (!payload) return null;
    return prisma.user.findUnique({
        where: { id: payload.id },
        include: { farmerProfile: true },
    });
}

export { TOKEN_NAME };
