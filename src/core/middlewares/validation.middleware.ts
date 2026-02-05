/**
 * Validation middleware – Zod schemas; throw AppError on invalid.
 */

import { z } from "zod";
import { AppError } from "@core/errors/AppError";

export async function parseBody<T>(request: Request, schema: z.ZodType<T>): Promise<T> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new AppError({ statusCode: 400, message: "Invalid JSON body", code: "VALIDATION_ERROR" });
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    const first = result.error.flatten().fieldErrors;
    const message = Object.values(first).flat().join("; ") || "Validation failed";
    throw new AppError({ statusCode: 400, message, code: "VALIDATION_ERROR" });
  }
  return result.data;
}

export function parseSearchParams<T>(searchParams: URLSearchParams | null, schema: z.ZodType<T>): T {
  const obj: Record<string, string> = {};
  searchParams?.forEach((v, k) => (obj[k] = v));
  const result = schema.safeParse(obj);
  if (!result.success) {
    const first = result.error.flatten().fieldErrors;
    const message = Object.values(first).flat().join("; ") || "Validation failed";
    throw new AppError({ statusCode: 400, message, code: "VALIDATION_ERROR" });
  }
  return result.data;
}
