/**
 * Structured JSON logging – no console.log in production.
 */

const isProd = process.env.NODE_ENV === "production";

export const logger = {
  info: (obj: Record<string, unknown>) => {
    if (isProd) console.log(JSON.stringify({ level: "info", ...obj }));
    else console.log("[INFO]", obj);
  },
  warn: (obj: Record<string, unknown>) => {
    if (isProd) console.warn(JSON.stringify({ level: "warn", ...obj }));
    else console.warn("[WARN]", obj);
  },
  error: (obj: Record<string, unknown>) => {
    if (isProd) console.error(JSON.stringify({ level: "error", ...obj }));
    else console.error("[ERROR]", obj);
  },
};
