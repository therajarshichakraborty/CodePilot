import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

/**
 * Edge-safe Auth.js config shared by `auth.ts` and `proxy.ts`.
 * Do not import Prisma, winston or other Node-only modules here.
 *
 * GitHub reads AUTH_GITHUB_ID / AUTH_GITHUB_SECRET from the environment automatically.
 */
export default {
  providers: [GitHub],
  trustHost: true,
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },
} satisfies NextAuthConfig;
