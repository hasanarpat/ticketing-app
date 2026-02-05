/**
 * OAuth helpers – state validation, provider config.
 * Used by auth module for Google/GitHub.
 */

export type OAuthProvider = "google" | "github";

export function generateState(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < 32; i++) array[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function getOAuthConfig(provider: OAuthProvider): { clientId: string; clientSecret: string } {
  switch (provider) {
    case "google":
      return {
        clientId: process.env.GOOGLE_ID ?? "",
        clientSecret: process.env.GOOGLE_SECRET ?? "",
      };
    case "github":
      return {
        clientId: process.env.GITHUB_ID ?? "",
        clientSecret: process.env.GITHUB_SECRET ?? "",
      };
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
