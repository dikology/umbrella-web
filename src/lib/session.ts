import { cookies } from "next/headers";

/**
 * Asks the API who is calling, forwarding the request's cookies. Unlike the
 * proxy's token decode, which is only a hint (ADR-0002), this is the truth.
 */
export async function fetchMe(): Promise<Response> {
  const origin = process.env.API_ORIGIN ?? "http://localhost:8000";
  return fetch(`${origin}/api/v1/me`, {
    headers: { cookie: (await cookies()).toString() },
    cache: "no-store",
  });
}

/** Whether the API recognises the caller. A visitor with no access token isn't asked about. */
export async function isLoggedIn(): Promise<boolean> {
  if (!(await cookies()).has("ub_access")) return false;
  return (await fetchMe()).ok;
}
