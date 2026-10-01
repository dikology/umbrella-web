import Link from 'next/link';
import { redirect } from 'next/navigation';
import AuthShell, { authLinkClass } from '@/components/AuthShell';
import SignupForm from '@/components/SignupForm';
import { isLoggedIn } from '@/lib/session';

export const metadata = {
  title: 'Sign up - Umbrella',
  robots: 'noindex',
};

export default async function SignupPage() {
  if (await isLoggedIn()) redirect('/space');

  return (
    <AuthShell
      title="Create your account"
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className={authLinkClass}>
            Log in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
