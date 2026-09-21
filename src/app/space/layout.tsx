import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import SpaceNav from "@/components/SpaceNav";

export const metadata = {
  title: "Your space - Umbrella",
  robots: "noindex",
};

// Authoritative gate: ask the API who we are, forwarding the cookie. The
// proxy's token decode is only a hint (ADR-0002); this response is the truth.
export default async function SpaceLayout({ children }: { children: React.ReactNode }) {
  const cookieHeader = (await cookies()).toString();
  const origin = process.env.API_ORIGIN ?? "http://localhost:8000";

  const response = await fetch(`${origin}/api/v1/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  if (response.status === 401) redirect("/login");
  if (!response.ok) throw new Error(`GET /api/v1/me failed with ${response.status}`);

  return (
    <div className="min-h-screen bg-paper-100">
      <header className="border-b border-paper-300 bg-paper-50">
        {/* On a phone the nav takes a row of its own under the wordmark and Log out. */}
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-8 px-4 sm:h-16 sm:flex-nowrap sm:px-6">
          <Link
            href="/space"
            className="my-3 sm:my-0 font-display text-2xl font-semibold tracking-tight text-coral-600 hover:text-coral-700 hover:no-underline rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-coral-500"
          >
            Umbrella
          </Link>
          <SpaceNav />
          <div className="sm:order-last">
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">{children}</main>
    </div>
  );
}
