/**
 * Pagination – max limit enforced, no unbounded queries.
 */

import { env } from "@core/config/env";
import { AppError } from "@core/errors/AppError";

const MAX_LIMIT = env.pagination.maxLimit;
const DEFAULT_LIMIT = env.pagination.defaultLimit;

export type PaginationParams = {
  page: number;
  limit: number;
  skip: number;
};

export function parsePagination(searchParams: URLSearchParams | null): PaginationParams {
  const page = Math.max(1, parseInt(searchParams?.get("page") ?? "1", 10) || 1);
  let limit = parseInt(searchParams?.get("limit") ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) {
    throw new AppError({
      statusCode: 400,
      message: `Limit cannot exceed ${MAX_LIMIT}`,
      code: "PAGINATION_LIMIT_EXCEEDED",
    });
  }
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
