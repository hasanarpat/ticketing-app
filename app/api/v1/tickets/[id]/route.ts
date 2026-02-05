/**
 * GET/PUT/DELETE /api/v1/tickets/[id]
 */

import { NextRequest, NextResponse } from "next/server";
import { withRateLimit } from "@core/middlewares/rateLimit.middleware";
import { requireAuth } from "@core/middlewares/auth.middleware";
import { requirePermission } from "@core/middlewares/permission.middleware";
import { parseBody } from "@core/middlewares/validation.middleware";
import { successResponse } from "@core/utils/response";
import { handleApiError } from "@core/errors/errorHandler";
import { PERMISSIONS } from "@core/config/auth";
import { connectDb } from "@lib/mongodb";
import * as ticketService from "@modules/ticket/ticket.service";
import { z } from "zod";

const updateTicketSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  priority: z.number().optional(),
  progress: z.number().optional(),
  status: z.string().optional(),
  active: z.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const rateLimitRes = withRateLimit(request, false);
  if (rateLimitRes) return rateLimitRes;
  try {
    await connectDb();
    const payload = await requireAuth(request);
    requirePermission(payload, PERMISSIONS.TICKET_READ);
    const { id } = params;
    const ticket = await ticketService.getTicket(id);
    return successResponse(ticket, undefined, 200);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const rateLimitRes = withRateLimit(request, false);
  if (rateLimitRes) return rateLimitRes;
  try {
    await connectDb();
    const payload = await requireAuth(request);
    requirePermission(payload, PERMISSIONS.TICKET_WRITE);
    const { id } = params;
    const body = await parseBody(request, updateTicketSchema);
    const ticket = await ticketService.updateTicket(id, body);
    return successResponse(ticket, undefined, 200);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const rateLimitRes = withRateLimit(request, false);
  if (rateLimitRes) return rateLimitRes;
  try {
    await connectDb();
    const payload = await requireAuth(request);
    requirePermission(payload, PERMISSIONS.TICKET_DELETE);
    const { id } = params;
    await ticketService.deleteTicket(id);
    return successResponse({ message: "Ticket deleted" }, undefined, 200);
  } catch (err) {
    return handleApiError(err);
  }
}
