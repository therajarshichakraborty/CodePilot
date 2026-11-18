"use server";

import { auth, signIn, signOut } from "@/auth";
// Unused for now — only needed by the commented-out helpers below.
// import { db } from "@/lib/db.config";
// import logger from "@/lib/logger";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

export const signInWithGithub = async () => {
  await signIn("github", { redirectTo: DEFAULT_LOGIN_REDIRECT });
};

export const signOutUser = async () => {
  await signOut({ redirectTo: "/auth/sign-in" });
};

// Unused: the Prisma adapter now handles user/account lookups during sign-in.
// export const getUserById = async (id: string) => {
//   try {
//     return await db.user.findUnique({ where: { id }, include: { accounts: true } });
//   } catch (error) {
//     logger.error("Error getting user by ID", error);
//     return null;
//   }
// };
//
// export const getAccountByUserId = async (userId: string) => {
//   try {
//     return await db.account.findFirst({ where: { userId } });
//   } catch (error) {
//     logger.error("Error getting account by user ID", error);
//     return null;
//   }
// };

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};
