/**
 * POST /api/v1/auth/logout – clear JWT cookie and redirect to home.
 */

import { NextRequest, NextResponse } from "next/server";
import { env } from "@core/config/env";

export async function POST(request: NextRequest) {
  const name = env.jwt.cookieName;
  const clearCookie = `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
  const base = request.nextUrl.origin;
  const res = NextResponse.redirect(new URL("/", base), 303);
  res.headers.set("Set-Cookie", clearCookie);
  return res;
}
