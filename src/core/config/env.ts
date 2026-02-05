/**
 * Environment config – all env vars typed and validated.
 * No magic strings; deploy-ready.
 */

const required = (key: string): string => {
  const v = process.env[key];
  if (v == null || v === "") throw new Error(`Missing env: ${key}`);
  return v;
};

const optional = (key: string, fallback: string): string => {
  return process.env[key] ?? fallback;
};

export const env = {
  nodeEnv: optional("NODE_ENV", "development"),
  isProd: process.env.NODE_ENV === "production",

  mongo: required("MONGO"),
  nextAuthSecret: required("NEXTAUTH_SECRET"),
  nextAuthUrl: optional("NEXTAUTH_URL", "http://localhost:3000"),

  jwt: {
    get secret(): string {
      const s = process.env.JWT_SECRET ?? process.env.NEXTAUTH_SECRET;
      if (!s) throw new Error("Missing env: JWT_SECRET or NEXTAUTH_SECRET");
      return s;
    },
    accessTokenExpiry: optional("JWT_ACCESS_EXPIRY", "15m"),
    cookieName: optional("JWT_COOKIE_NAME", "auth-token"),
  },

  cors: {
    allowedOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:3000").split(",").map((s) => s.trim()),
  },

  rateLimit: {
    windowMs: Number(optional("RATE_LIMIT_WINDOW_MS", "60000")),
    maxPerWindow: Number(optional("RATE_LIMIT_MAX", "100")),
    authMaxPerWindow: Number(optional("RATE_LIMIT_AUTH_MAX", "10")),
  },

  pagination: {
    defaultLimit: Math.min(Number(optional("PAGINATION_DEFAULT_LIMIT", "20")), 100),
    maxLimit: 100,
  },
} as const;
