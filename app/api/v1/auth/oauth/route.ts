/**
 * GET /api/v1/auth/oauth?provider=google|github – redirect to OAuth provider.
 * Callback URL handled by existing NextAuth or a separate callback route if needed.
 * Minimal implementation: redirect to provider auth URL.
 */

import { NextResponse } from "next/server";
import { withRateLimit } from "@core/middlewares/rateLimit.middleware";
import { handleApiError } from "@core/errors/errorHandler";
import { generateState, getOAuthConfig, type OAuthProvider } from "@lib/oauth";
import { env } from "@core/config/env";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";

export async function GET(request: Request) {
  const rateLimitRes = withRateLimit(request, false);
  if (rateLimitRes) return rateLimitRes;

  try {
    const { searchParams } = new URL(request.url);
    const provider = (searchParams.get("provider") ?? "google") as OAuthProvider;
    if (provider !== "google" && provider !== "github") {
      return NextResponse.json(
        { success: false, error: { message: "Invalid provider", code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }
    const config = getOAuthConfig(provider);
    if (!config.clientId) {
      return NextResponse.json(
        { success: false, error: { message: "OAuth not configured", code: "CONFIG_ERROR" } },
        { status: 503 }
      );
    }
    const state = generateState();
    const redirectUri = `${env.nextAuthUrl}/api/auth/callback/${provider}`;
    const scope = provider === "google" ? "openid email profile" : "user:email";
    const baseUrl = provider === "google" ? GOOGLE_AUTH_URL : GITHUB_AUTH_URL;
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope,
      state,
    });
    return NextResponse.redirect(`${baseUrl}?${params.toString()}`);
  } catch (err) {
    return handleApiError(err);
  }
}
