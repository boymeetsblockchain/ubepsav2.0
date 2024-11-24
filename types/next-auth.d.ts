import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `getSession` and `useSession`
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  /**
   * Passed to `jwt` and `session` callbacks
   */
  interface User extends DefaultUser {
    role?: string;
  }

  interface JWT {
    sub: string;
    role?: string;
  }
}
