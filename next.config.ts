import type { NextConfig } from "next";

// Server-side only (deliberately not NEXT_PUBLIC_): the browser only ever
// talks to this origin, and Next proxies /api/* to the API. See ADR-0002.
const API_ORIGIN = process.env.API_ORIGIN ?? "http://localhost:8000";

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
