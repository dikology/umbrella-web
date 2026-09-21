'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError, api, type Text } from '@/lib/api';
import { formatAddedDate } from '@/lib/format';
import Button from './Button';

type State =
  | { status: 'loading' }
  | { status: 'missing' }
  | { status: 'error' }
  | { status: 'ready'; text: Text };

/**
 * A Text as written, line breaks and all. It stands in for the Reader
 * (tappable Words, Dictionary Entries, marking), which replaces it.
 */
export default function TextView({ id }: { id: string }) {
  const router = useRouter();
  const [state, setState] = useState<State>({ status: 'loading' });

  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    api.openText(id).then(
      (text) => {
        if (!cancelled) setState({ status: 'ready', text });
      },
      (error) => {
        if (cancelled) return;
        if (error instanceof ApiError && error.status === 401) {
          router.replace('/login');
        } else if (error instanceof ApiError && (error.status === 404 || error.status === 422)) {
          // 422 is a malformed id: as far as this Library knows, no such Text.
          setState({ status: 'missing' });
        } else {
          setState({ status: 'error' });
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, [id, attempt, router]);

  function retry() {
    setState({ status: 'loading' });
    setAttempt((n) => n + 1);
  }

  if (state.status === 'loading') {
    return (
      <p role="status" className="font-ui mt-6 text-sm text-ink-400">
        Opening this Text…
      </p>
    );
  }

  if (state.status === 'missing') {
    return (
      <div className="mt-6">
        <h1 className="mb-3 text-3xl text-ink-700">This Text isn’t in your Library.</h1>
        <p className="text-ink-500">
          It may have been deleted. <Link href="/space">Back to your Library</Link>
        </p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div role="alert" className="mt-6 rounded-xl border border-paper-300 bg-paper-50 p-6">
        <p className="mb-4 text-ink-500">This Text didn’t load. Check your connection and try again.</p>
        <Button variant="secondary" size="sm" onClick={retry}>
          Try again
        </Button>
      </div>
    );
  }

  const { text } = state;
  return (
    <article className="mt-6">
      <header className="mb-10 border-b border-paper-300 pb-6">
        <h1 className="font-han mb-2 text-4xl leading-tight text-ink-700 break-words sm:text-5xl">
          {text.title}
        </h1>
        <p className="font-ui mb-0 text-sm text-ink-400">
          Added <time dateTime={text.created_at}>{formatAddedDate(text.created_at)}</time>
        </p>
      </header>
      <div
        lang="zh"
        className="font-han max-w-[36em] whitespace-pre-wrap break-words text-xl leading-[1.9] tracking-normal text-ink-700"
      >
        {text.body}
      </div>
    </article>
  );
}
