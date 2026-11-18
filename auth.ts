import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "./schema/db";
import { env } from "./lib/env";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: env.AUTH_SECRET,

  events: {
    async linkAccount({ user, profile }) {
      const login = (profile as { login?: string } | undefined)?.login;
      if (user.id && login) {
        await db.user.update({ where: { id: user.id }, data: { githubUsername: login } });
      }
    }
  }
});
