import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ message: "Name is Required" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .string({ message: "Email is Required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is Required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password cannot exceed 100 characters" }),
});
