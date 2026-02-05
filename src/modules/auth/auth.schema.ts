import { z } from "zod";

const passwordMin = 8;

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name required").max(200),
  email: z.string().email("Invalid email"),
  password: z.string().min(passwordMin, `Password must be at least ${passwordMin} characters`),
});

export type LoginBody = z.infer<typeof loginSchema>;
export type RegisterBody = z.infer<typeof registerSchema>;
