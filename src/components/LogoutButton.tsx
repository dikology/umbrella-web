'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Button from './Button';

export default function LogoutButton() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function onClick() {
    setSubmitting(true);
    try {
      await api.logout();
    } finally {
      router.push('/login');
    }
  }

  return (
    <Button variant="secondary" onClick={onClick} disabled={submitting}>
      {submitting ? 'Logging out…' : 'Log out'}
    </Button>
  );
}
