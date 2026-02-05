/**
 * GET /api/v1/auth/me – current user from JWT cookie.
 */

import { NextResponse } from "next/server";
import { withRateLimit } from "@core/middlewares/rateLimit.middleware";
import { requireAuth } from "@core/middlewares/auth.middleware";
import { successResponse } from "@core/utils/response";
import { handleApiError } from "@core/errors/errorHandler";
import { getSafeUser } from "@modules/user/user.service";
import { connectDb } from "@lib/mongodb";

export async function GET(request: Request) {
  const rateLimitRes = withRateLimit(request, false);
  if (rateLimitRes) return rateLimitRes;

  try {
    await connectDb();
    const payload = await requireAuth(request);
    const user = await getSafeUser(payload.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: { message: "User not found", code: "AUTH_401" } },
        { status: 401 }
      );
    }
    return successResponse(
      { user: { id: user.id, name: user.name, email: user.email, role: user.role } },
      undefined,
      200
    );
  } catch (err) {
    return handleApiError(err);
  }
}
