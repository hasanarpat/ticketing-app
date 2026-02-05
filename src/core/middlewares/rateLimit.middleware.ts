/**
 * Rate limit middleware – returns 429 if over limit.
 */

import { NextResponse } from "next/server";
import { checkRateLimit, checkAuthRateLimit } from "@core/config/rateLimit";

export function withRateLimit(request: Request, isAuthEndpoint: boolean): NextResponse | null {
  const allowed = isAuthEndpoint ? checkAuthRateLimit(request) : checkRateLimit(request);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: { message: "Too many requests", code: "RATE_LIMIT" } },
      { status: 429 }
    );
  }
  return null;
}
