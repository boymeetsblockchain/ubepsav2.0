import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./utils/login-validator";
import { userExist } from "./utils/userExist";
import { compare } from "bcryptjs";
import { ZodError } from "zod";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        try {
          // Parse and validate credentials with Zod
          const { email, password } = loginSchema.parse(credentials);

          // Check if the user exists in the database
          const user = await userExist(email);
          if (!user) {
            throw new Error("No user found with this email");
          }

          // Verify password
          const isValid = await compare(password, user.password);
          if (!isValid) {
            throw new Error("Incorrect password");
          }

          // Return user data if valid
          return {
            id: user.id,
            email: user.email,
            name: user.username,
            image: user.imageUrl,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Validation error:", error.flatten().fieldErrors);
            return null; // Return null if Zod validation fails
          }
          console.error("Authorization error:");
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
