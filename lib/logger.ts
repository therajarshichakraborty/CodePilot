import path from "node:path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const LOG_DIR = path.join(process.cwd(), "logs");
const IS_PROD = process.env.NODE_ENV === "production";
const LOG_LEVEL = process.env.LOG_LEVEL ?? (IS_PROD ? "info" : "debug");

const devConsoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ level, message, timestamp, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? " " + JSON.stringify(meta, null, 2) : "";
    return stack
      ? `${timestamp} ${level}: ${message}\n${stack}${metaStr}`
      : `${timestamp} ${level}: ${message}${metaStr}`;
  }),
);

const prodConsoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: IS_PROD ? prodConsoleFormat : devConsoleFormat,
  }),

  new DailyRotateFile({
    dirname: LOG_DIR,
    filename: "error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    level: "error",
    format: fileFormat,
    maxSize: "20m",
    maxFiles: "30d",
    zippedArchive: true,
  }),

  new DailyRotateFile({
    dirname: LOG_DIR,
    filename: "combined-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    format: fileFormat,
    maxSize: "100m",
    maxFiles: "30d",
    zippedArchive: true,
  }),
];

const globalForLogger = globalThis as typeof globalThis & {
  __winstonLogger?: winston.Logger;
};

const logger: winston.Logger =
  globalForLogger.__winstonLogger ??
  winston.createLogger({
    level: LOG_LEVEL,
    defaultMeta: { service: "codepilot" },
    transports,
    exitOnError: false,
  });

if (!IS_PROD) {
  globalForLogger.__winstonLogger = logger;
}

export default logger;
