import type { NextConfig } from "next";

// Server-side only (deliberately not NEXT_PUBLIC_): the browser only ever
// talks to this origin, and Next proxies /api/* to the API. See ADR-0002.
// Rewrites are resolved at build time, so production builds must have it set.
const API_ORIGIN =
  process.env.API_ORIGIN ??
  (process.env.NODE_ENV === "production" ? undefined : "http://localhost:8000");

if (!API_ORIGIN) {
  throw new Error("API_ORIGIN must be set for production builds (see .env.example).");
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_ORIGIN}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
