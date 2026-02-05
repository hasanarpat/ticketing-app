/**
 * Health check – no auth, rate limit relaxed.
 */

import { NextResponse } from "next/server";
import { withRateLimit } from "@core/middlewares/rateLimit.middleware";
import { successResponse } from "@core/utils/response";
import { connectDb } from "@lib/mongodb";

export async function GET(request: Request) {
  const rateLimitRes = withRateLimit(request, false);
  if (rateLimitRes) return rateLimitRes;

  try {
    await connectDb();
    return successResponse(
      { status: "ok", timestamp: new Date().toISOString(), db: "connected" },
      undefined,
      200
    );
  } catch {
    return successResponse(
      { status: "degraded", timestamp: new Date().toISOString(), db: "disconnected" },
      undefined,
      503
    );
  }
}
