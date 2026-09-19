import { NextResponse, type NextRequest } from "next/server";
import { hasUnexpiredAccessToken } from "@/lib/session-hint";

// Next 16 calls this file convention "proxy" (formerly "middleware").
//
// INVARIANT: the decoded `ub_access` token is a HINT, never an authorization.
// We decode it without verifying the signature (the web tier holds no signing
// key, by design — ADR-0002) purely to bounce signed-out visitors cheaply.
// Nothing downstream may trust its `sub` or `role`; only a response from the
// API (see the /space layout's GET /api/v1/me) establishes who is calling.
export function proxy(request: NextRequest) {
  if (hasUnexpiredAccessToken(request.cookies.get("ub_access")?.value)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/space", "/space/:path*"],
};
