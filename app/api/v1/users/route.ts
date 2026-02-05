/**
 * GET /api/v1/users – list users (paginated); requires USER_READ.
 * POST not here; use /api/v1/auth/register.
 */

import { NextResponse } from "next/server";
import { withRateLimit } from "@core/middlewares/rateLimit.middleware";
import { requireAuth } from "@core/middlewares/auth.middleware";
import { requirePermission } from "@core/middlewares/permission.middleware";
import { successResponse } from "@core/utils/response";
import { handleApiError } from "@core/errors/errorHandler";
import { PERMISSIONS } from "@core/config/auth";
import { parsePagination } from "@core/utils/pagination";
import { connectDb } from "@lib/mongodb";
import { UserModel } from "@modules/user/user.schema";

export async function GET(request: Request) {
  const rateLimitRes = withRateLimit(request, false);
  if (rateLimitRes) return rateLimitRes;

  try {
    await connectDb();
    const payload = await requireAuth(request);
    requirePermission(payload, PERMISSIONS.USER_READ);

    const url = new URL(request.url);
    const { page, limit, skip } = parsePagination(url.searchParams);

    const [list, total] = await Promise.all([
      UserModel.find({ deletedAt: null }).select("-password").skip(skip).limit(limit).lean().exec(),
      UserModel.countDocuments({ deletedAt: null }),
    ]);

    const data = list.map((u: { _id: unknown; name?: string; email?: string; role?: string }) => ({
      id: String(u._id),
      name: u.name ?? "",
      email: u.email ?? "",
      role: u.role ?? "user",
    }));

    return successResponse(data, { total, page, limit }, 200);
  } catch (err) {
    return handleApiError(err);
  }
}
