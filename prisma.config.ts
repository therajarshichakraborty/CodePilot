import dotenv from "dotenv";
dotenv.config();

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "schema/schema.prisma",
  migrations: {
    path: "schema/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
