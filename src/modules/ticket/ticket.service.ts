import { AppError } from "@core/errors/AppError";
import * as ticketRepo from "./ticket.repository";

export async function createTicket(data: Record<string, unknown>) {
  return ticketRepo.createTicket(data);
}

export async function listTickets(skip: number, limit: number) {
  const [list, total] = await Promise.all([
    ticketRepo.findTickets(skip, limit),
    ticketRepo.countTickets(),
  ]);
  return { list, total };
}

export async function getTicket(id: string) {
  const ticket = await ticketRepo.findTicketById(id);
  if (!ticket) throw new AppError({ statusCode: 404, message: "Ticket not found", code: "NOT_FOUND" });
  return ticket;
}

export async function updateTicket(id: string, data: Record<string, unknown>) {
  const ticket = await ticketRepo.updateTicketById(id, data);
  if (!ticket) throw new AppError({ statusCode: 404, message: "Ticket not found", code: "NOT_FOUND" });
  return ticket;
}

export async function deleteTicket(id: string) {
  const ticket = await ticketRepo.softDeleteTicketById(id);
  if (!ticket) throw new AppError({ statusCode: 404, message: "Ticket not found", code: "NOT_FOUND" });
  return ticket;
}
