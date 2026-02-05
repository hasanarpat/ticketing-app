/**
 * Rate limit config – sliding window, IP + optional user.
 * In-memory for single instance; replace with Redis/KV for multi-instance.
 */

const store = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000;
const MAX_GENERAL = 100;
const MAX_AUTH = 10;

function getKey(identifier: string, prefix: string): string {
  return `${prefix}:${identifier}`;
}

function slidingWindow(key: string, windowMs: number, max: number): boolean {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count += 1;
  return true;
}

/** Returns true if allowed, false if rate limited. */
export function checkRateLimit(
  request: Request,
  options: { windowMs?: number; max?: number; prefix?: string } = {}
): boolean {
  const windowMs = options.windowMs ?? WINDOW_MS;
  const max = options.max ?? MAX_GENERAL;
  const prefix = options.prefix ?? "ip";
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  const key = getKey(ip, prefix);
  return slidingWindow(key, windowMs, max);
}

/** Stricter limit for auth endpoints (login/register). */
export function checkAuthRateLimit(request: Request): boolean {
  return checkRateLimit(request, { max: MAX_AUTH, prefix: "auth" });
}
