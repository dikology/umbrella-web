'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Button from './Button';

export default function LogoutButton() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setSubmitting(true);
    setError(null);
    try {
      await api.logout();
      router.push('/login');
    } catch {
      setError('Could not log out. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <>
      {error && (
        <p role="alert" className="font-ui text-sm text-coral-600 mb-3">
          {error}
        </p>
      )}
      <Button variant="secondary" onClick={onClick} disabled={submitting}>
        {submitting ? 'Logging out…' : 'Log out'}
      </Button>
    </>
  );
}
