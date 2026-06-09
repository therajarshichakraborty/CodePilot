"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db.config";
import logger from "@/lib/logger.config";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        accounts: true,
      },
    });
    return user;
  } catch (error) {
    logger.error("Error getting user by ID", error);
    return null;
  }
};

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch (error) {
    logger.error("Error getting account by ID", error);
    return null;
  }
};

export const currentUser = async () => {
  const user = await auth();
  return user?.user;
};
