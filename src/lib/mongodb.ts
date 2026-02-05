/**
 * MongoDB connection – single client; SRV → direct URI for problematic networks.
 */

import mongoose from "mongoose";

function getMongoUri(): string {
  const uri = process.env.MONGO;
  if (!uri) throw new Error("Missing env: MONGO");
  if (uri.startsWith("mongodb+srv://")) {
    return uri
      .replace("mongodb+srv://", "mongodb://")
      .replace(/@([^/?#]+)([/?#]|$)/, "@$1:27017$2");
  }
  return uri;
}

let connected = false;

export async function connectDb(): Promise<typeof mongoose> {
  if (connected) return mongoose;
  const uri = getMongoUri();
  const conn = await mongoose.connect(uri);
  connected = true;
  return conn;
}

export { mongoose };
