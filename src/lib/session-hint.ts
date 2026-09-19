/**
 * Reads the `exp` claim out of an access-token JWT WITHOUT verifying its
 * signature. The result is a hint for cheap redirects only — never an
 * authorization. See ADR-0002.
 */
export function hasUnexpiredAccessToken(token: string | undefined, nowMs = Date.now()): boolean {
  if (!token) return false;
  const payload = token.split(".")[1];
  if (!payload) return false;
  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const claims: unknown = JSON.parse(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")));
    if (typeof claims !== "object" || claims === null || !("exp" in claims)) return false;
    return typeof claims.exp === "number" && claims.exp * 1000 > nowMs;
  } catch {
    return false;
  }
}
