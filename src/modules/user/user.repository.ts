/**
 * User repository – DB only; no business logic.
 */

import { UserModel, type UserDocument } from "./user.schema";

export async function findUserByEmail(email: string): Promise<UserDocument | null> {
  return UserModel.findOne({ email, deletedAt: null }).lean().exec() as Promise<UserDocument | null>;
}

export async function findUserById(id: string): Promise<UserDocument | null> {
  return UserModel.findOne({ _id: id, deletedAt: null }).lean().exec() as Promise<UserDocument | null>;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}): Promise<UserDocument> {
  const doc = await UserModel.create(data);
  return doc.toObject() as UserDocument;
}
