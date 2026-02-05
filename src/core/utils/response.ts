/**
 * Global response format – success and meta only.
 * No raw arrays; consistent status codes.
 */

import { NextResponse } from "next/server";

export type SuccessMeta = {
  total?: number;
  page?: number;
  limit?: number;
};

export function successResponse<T>(data: T, meta?: SuccessMeta, status = 200): NextResponse {
  const body: { success: true; data: T; meta?: SuccessMeta } = { success: true, data };
  if (meta && Object.keys(meta).length > 0) body.meta = meta;
  return NextResponse.json(body, { status });
}
