/**
 * User Mongoose schema – soft delete, versioning, indexes.
 */

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // false for OAuth-only users
    role: { type: String, default: "user", enum: ["user", "admin", "unverified"] },
    schemaVersion: { type: Number, default: 1 },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ deletedAt: 1 });

export const UserModel =
  mongoose.models.User ?? mongoose.model("User", userSchema);

export type UserDocument = mongoose.InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
