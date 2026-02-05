/**
 * POST /api/v1/auth/register – create user, no auto-login.
 */

import { NextResponse } from "next/server";
import { withRateLimit } from "@core/middlewares/rateLimit.middleware";
import { parseBody } from "@core/middlewares/validation.middleware";
import { successResponse } from "@core/utils/response";
import { handleApiError } from "@core/errors/errorHandler";
import { registerSchema } from "@modules/auth/auth.schema";
import { registerUser } from "@modules/user/user.service";
import { connectDb } from "@lib/mongodb";

export async function POST(request: Request) {
  const rateLimitRes = withRateLimit(request, true);
  if (rateLimitRes) return rateLimitRes;

  try {
    await connectDb();
    const body = await parseBody(request, registerSchema);
    const user = await registerUser({
      name: body.name,
      email: body.email,
      password: body.password,
    });
    return successResponse(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      undefined,
      201
    );
  } catch (err) {
    return handleApiError(err);
  }
}
