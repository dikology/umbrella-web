import Link from 'next/link';
import { redirect } from 'next/navigation';
import AuthShell, { authLinkClass } from '@/components/AuthShell';
import LoginForm from '@/components/LoginForm';
import { isLoggedIn } from '@/lib/session';

export const metadata = {
  title: 'Log in - Umbrella',
  robots: 'noindex',
};

export default async function LoginPage() {
  if (await isLoggedIn()) redirect('/space');

  return (
    <AuthShell
      title="Log in"
      footer={
        <>
          New to Umbrella?{' '}
          <Link href="/signup" className={authLinkClass}>
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
