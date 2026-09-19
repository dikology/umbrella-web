import Link from 'next/link';
import AuthShell, { authLinkClass } from '@/components/AuthShell';
import LoginForm from '@/components/LoginForm';

export const metadata = {
  title: 'Log in - Umbrella',
  robots: 'noindex',
};

export default function LoginPage() {
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
