import type { Instrumentation } from "next";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { default: logger } = await import("./lib/logger.config");
    logger.info("Winston logger initialised", {
      env: process.env.NODE_ENV,
      runtime: process.env.NEXT_RUNTIME,
    });
  }
}

export const onRequestError: Instrumentation.onRequestError = async (
  error: any,
  request,
  context,
) => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { default: logger } = await import("./lib/logger.config");
    logger.error("Unhandled server request error", {
      digest: error.digest,
      message: error.message,
      stack: error.stack,
      path: request.path,
      method: request.method,
      routePath: context.routePath,
      routeType: context.routeType,
      routerKind: context.routerKind,
    });
  }
};
