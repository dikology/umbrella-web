import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthShellProps {
  title: string;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthShell({ title, children, footer }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-paper-100 flex flex-col items-center px-4 py-12">
      <Link
        href="/"
        className="font-display text-3xl font-semibold text-coral-600 hover:text-coral-700 tracking-tight mb-8 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
      >
        Umbrella
      </Link>
      <div className="w-full max-w-md bg-paper-50 border border-paper-300 rounded-xl shadow-md p-8">
        <h1 className="font-display text-3xl font-semibold text-ink-700 mb-6">{title}</h1>
        {children}
      </div>
      <p className="font-ui mt-6 text-sm text-ink-500">{footer}</p>
    </main>
  );
}

export const authLinkClass =
  'font-medium text-teal-600 hover:text-teal-700 underline rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500';
