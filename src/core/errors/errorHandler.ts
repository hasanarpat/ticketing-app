/**
 * Global error handler – masks internal errors, no stack in production.
 * Logs structured JSON; returns consistent error response.
 */

import { NextResponse } from "next/server";
import { AppError } from "@core/errors/AppError";
import { logger } from "@core/utils/logger";

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    if (error.statusCode !== 401) {
      logger.warn({ code: error.code, statusCode: error.statusCode, message: error.message });
    }
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message,
          code: error.code,
        },
      },
      { status: error.statusCode }
    );
  }

  const err = error as Error;
  const message = err?.message ?? "Unknown error";
  const name = err?.name ?? "Error";
  logger.error({ name, message });
  const isProd = process.env.NODE_ENV === "production";
  return NextResponse.json(
    {
      success: false,
      error: {
        message: isProd ? "Internal server error" : (error as Error).message,
        code: "INTERNAL_ERROR",
      },
    },
    { status: 500 }
  );
}
