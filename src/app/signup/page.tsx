import Link from 'next/link';
import AuthShell, { authLinkClass } from '@/components/AuthShell';
import SignupForm from '@/components/SignupForm';

export const metadata = {
  title: 'Sign up - Umbrella',
  robots: 'noindex',
};

export default function SignupPage() {
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
