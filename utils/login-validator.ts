import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string({ message: "Email is Required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is Required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password cannot exceed 100 characters" }),
});
