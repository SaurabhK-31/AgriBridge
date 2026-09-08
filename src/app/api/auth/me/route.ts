import { getFullSessionUser } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/response';

export async function GET() {
    const user = await getFullSessionUser();
    if (!user) {
        return errorResponse('Unauthorized', 'UNAUTHORIZED', 401);
    }

    const { password, ...safeUser } = user;
    return successResponse(safeUser);
}
