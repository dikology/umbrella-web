import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { learnerSchema } from "@/lib/api";

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

  const learner = learnerSchema.parse(await response.json());

  return (
    <main className="min-h-screen bg-paper-100 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-md bg-paper-50 border border-paper-300 rounded-xl shadow-md p-8">
        <h1 className="font-display text-3xl font-semibold text-ink-700 mb-6">Your space</h1>
        <dl className="font-ui text-sm text-ink-700 space-y-3 mb-6">
          <div>
            <dt className="text-ink-500">Email</dt>
            <dd>{learner.email}</dd>
          </div>
          <div>
            <dt className="text-ink-500">Role</dt>
            <dd>{learner.role}</dd>
          </div>
        </dl>
        {children}
      </div>
    </main>
  );
}
