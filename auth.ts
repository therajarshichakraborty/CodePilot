import type { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "./lib/db.config";
import { env } from "./lib/env";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: env.AUTH_SECRET,

  events: {
    // Store the GitHub username the first time an account is linked.
    async linkAccount({ user, profile }) {
      const login = (profile as { login?: string } | undefined)?.login;
      if (user.id && login) {
        await db.user.update({ where: { id: user.id }, data: { githubUsername: login } });
      }
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      // `user` is only present on sign-in; refresh role from the DB then.
      if (user?.id) {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });
        token.role = dbUser?.role ?? "USER";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
});
