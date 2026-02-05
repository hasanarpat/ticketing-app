import mongoose, { Schema } from 'mongoose';
import { mongoUri } from '../../lib/db';

mongoose.connect(mongoUri);

mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
