import "dotenv/config";
import { z } from "zod";
import logger from "./logger.config";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.coerce.string().min(1),
  //   JWT_ACCESS_SECRET: z.coerce.string().min(16),
  //   JWT_ACCESS_EXPIRES_IN: z.coerce.string(),
  //   JWT_REFRESH_SECRET: z.coerce.string().min(16),
  //   JWT_REFRESH_EXPIRES_IN: z.coerce.string(),
  //   SMTP_HOST: z.coerce.string().optional(),
  //   SMTP_PORT: z.coerce.number().optional(),
  //   SMTP_USER: z.coerce.string().optional(),
  //   SMTP_PASS: z.coerce.string().optional(),
  //   SMTP_FROM_NAME: z.coerce.string().optional(),
  //   SMTP_FROM_EMAIL: z.string().email().optional(),
  //   CLIENT_URL: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  logger.error(" Invalid environment variables:");
  logger.error(parsedEnv.error);
  process.exit(1);
}

export const env = parsedEnv.data;
