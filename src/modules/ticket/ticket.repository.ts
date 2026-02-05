import { TicketModel } from "./ticket.schema";

export async function createTicket(data: Record<string, unknown>) {
  return TicketModel.create(data);
}

export async function findTickets(skip: number, limit: number) {
  return TicketModel.find({ deletedAt: null }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec();
}

export async function countTickets() {
  return TicketModel.countDocuments({ deletedAt: null });
}

export async function findTicketById(id: string) {
  return TicketModel.findOne({ _id: id, deletedAt: null }).lean().exec();
}

export async function updateTicketById(id: string, data: Record<string, unknown>) {
  return TicketModel.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: data },
    { new: true }
  )
    .lean()
    .exec();
}

export async function softDeleteTicketById(id: string) {
  return TicketModel.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: new Date() } },
    { new: true }
  )
    .lean()
    .exec();
}
