/**
 * GET /api/v1/tickets – paginated list. POST – create. Requires TICKET_READ / TICKET_WRITE.
 */

import { NextResponse } from "next/server";
import { withRateLimit } from "@core/middlewares/rateLimit.middleware";
import { requireAuth } from "@core/middlewares/auth.middleware";
import { requirePermission } from "@core/middlewares/permission.middleware";
import { parseBody } from "@core/middlewares/validation.middleware";
import { successResponse } from "@core/utils/response";
import { handleApiError } from "@core/errors/errorHandler";
import { parsePagination } from "@core/utils/pagination";
import { PERMISSIONS } from "@core/config/auth";
import { connectDb } from "@lib/mongodb";
import * as ticketService from "@modules/ticket/ticket.service";
import { z } from "zod";

const createTicketSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().optional(),
  category: z.string().optional(),
  priority: z.number().optional(),
  progress: z.number().optional(),
  status: z.string().optional(),
  active: z.boolean().optional(),
});

export async function GET(request: Request) {
  const rateLimitRes = withRateLimit(request, false);
  if (rateLimitRes) return rateLimitRes;
  try {
    await connectDb();
    const payload = await requireAuth(request);
    requirePermission(payload, PERMISSIONS.TICKET_READ);
    const url = new URL(request.url);
    const { page, limit, skip } = parsePagination(url.searchParams);
    const { list, total } = await ticketService.listTickets(skip, limit);
    return successResponse(list, { total, page, limit }, 200);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: Request) {
  const rateLimitRes = withRateLimit(request, false);
  if (rateLimitRes) return rateLimitRes;
  try {
    await connectDb();
    const payload = await requireAuth(request);
    requirePermission(payload, PERMISSIONS.TICKET_WRITE);
    const body = await parseBody(request, createTicketSchema);
    await ticketService.createTicket(body);
    return successResponse({ message: "Ticket created" }, undefined, 201);
  } catch (err) {
    return handleApiError(err);
  }
}
