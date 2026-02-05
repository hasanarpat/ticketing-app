/**
 * Server-side helper: get current user from v1 API (JWT cookie).
 * Use in server components; pass cookies from next/headers.
 * @param {string} cookieHeader - Cookie header string (e.g. from (await cookies()).toString())
 * @returns {Promise<{ id: string, name: string, email: string, role: string } | null>}
 */
export async function getV1Session(cookieHeader) {
  const base = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${base}/api/v1/auth/me`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.user ?? null;
  } catch {
    return null;
  }
}
