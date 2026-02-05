/**
 * POST /api/v1/auth/login – email + password, returns JWT + Set-Cookie.
 */

import { NextResponse } from "next/server";
import { withRateLimit } from "@core/middlewares/rateLimit.middleware";
import { parseBody } from "@core/middlewares/validation.middleware";
import { successResponse } from "@core/utils/response";
import { handleApiError } from "@core/errors/errorHandler";
import { loginSchema } from "@modules/auth/auth.schema";
import { loginWithPassword } from "@modules/auth/auth.service";
import { connectDb } from "@lib/mongodb";

export async function POST(request: Request) {
  const rateLimitRes = withRateLimit(request, true);
  if (rateLimitRes) return rateLimitRes;

  try {
    await connectDb();
    const body = await parseBody(request, loginSchema);
    const result = await loginWithPassword(body.email, body.password);

    const response = successResponse(
      {
        userId: result.userId,
        role: result.role,
        permissions: result.permissions,
      },
      undefined,
      200
    );
    response.headers.set("Set-Cookie", result.cookieHeader);
    return response;
  } catch (err) {
    return handleApiError(err);
  }
}
