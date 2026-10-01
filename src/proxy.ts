import { NextResponse, type NextRequest } from "next/server";
import { hasUnexpiredAccessToken } from "@/lib/session-hint";

const ACCESS_COOKIE = "ub_access";
const REFRESH_COOKIE = "ub_refresh";

// Next 16 calls this file convention "proxy" (formerly "middleware").
//
// INVARIANT: the decoded `ub_access` token is a HINT, never an authorization.
// We decode it without verifying the signature (the web tier holds no signing
// key, by design — ADR-0002) purely to bounce signed-out visitors cheaply and
// to know when to ask the API for a fresh session. Nothing downstream may trust
// its `sub` or `role`; only a response from the API (see the /space layout's
// GET /api/v1/me) establishes who is calling.
export async function proxy(request: NextRequest) {
  // /login and /signup are never bounced from here: they ask the API themselves.
  const isSpace = request.nextUrl.pathname.startsWith("/space");
  const signedOut = () =>
    isSpace ? NextResponse.redirect(new URL("/login", request.url)) : NextResponse.next();

  if (hasUnexpiredAccessToken(request.cookies.get(ACCESS_COOKIE)?.value)) {
    return NextResponse.next();
  }
  if (!request.cookies.has(REFRESH_COOKIE)) return signedOut();

  const refreshed = await refreshSession(request);
  if (!refreshed?.ok) {
    const response = signedOut();
    // A refresh token the API has turned down is not worth offering again.
    if (refreshed?.status === 401) {
      response.cookies.delete(ACCESS_COOKIE);
      response.cookies.delete(REFRESH_COOKIE);
    }
    return response;
  }

  // The rotated pair goes two ways: onto this request, so the render behind the
  // proxy calls the API with the new access token, and to the browser to keep.
  const setCookies = refreshed.headers.getSetCookie();
  for (const setCookie of setCookies) {
    const pair = setCookie.split(";", 1)[0];
    const equals = pair.indexOf("=");
    if (equals > 0) request.cookies.set(pair.slice(0, equals).trim(), pair.slice(equals + 1).trim());
  }
  const response = NextResponse.next({ request: { headers: request.headers } });
  for (const setCookie of setCookies) response.headers.append("set-cookie", setCookie);
  return response;
}

/** POSTs the visitor's cookies to the API's refresh; null if the API can't be reached. */
async function refreshSession(request: NextRequest): Promise<Response | null> {
  const origin = process.env.API_ORIGIN ?? "http://localhost:8000";
  const headers = new Headers({ cookie: request.headers.get("cookie") ?? "" });
  // The API records the user agent with the session. It doesn't trust a forwarded
  // address yet (umbrella-api's `client_ip`), so until it does every refresh from
  // here counts against this server's address in its rate limiter.
  for (const name of ["user-agent", "x-forwarded-for"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  try {
    return await fetch(`${origin}/api/v1/auth/refresh`, { method: "POST", headers, cache: "no-store" });
  } catch {
    return null;
  }
}

export const config = {
  matcher: ["/space", "/space/:path*", "/login", "/signup"],
};
