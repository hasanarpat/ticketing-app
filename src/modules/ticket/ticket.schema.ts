/**
 * Ticket Mongoose schema – soft delete, versioning, indexes.
 */

import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    priority: { type: Number },
    progress: { type: Number },
    status: { type: String },
    active: { type: Boolean },
    schemaVersion: { type: Number, default: 1 },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

ticketSchema.index({ deletedAt: 1 });
ticketSchema.index({ category: 1 });

export const TicketModel =
  mongoose.models.Ticket ?? mongoose.model("Ticket", ticketSchema);
