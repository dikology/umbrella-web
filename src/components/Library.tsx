'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError, api, type DeclaredLevel, type TextSummary } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { hskLevelName, wordsCoveredBy } from '@/lib/hsk';
import Button, { buttonClasses } from './Button';
import DeclaredLevelPrompt from './DeclaredLevelPrompt';
import DeclaredLevelSetting from './DeclaredLevelSetting';
import DeleteTextDialog from './DeleteTextDialog';
import { TrashIcon } from './icons';

type State =
  | { status: 'loading' }
  | { status: 'error' }
  // `declared` is null until the Learner has been asked for their Declared Level,
  // and 'unknown' when it didn't load: the Texts still show, without the question.
  | { status: 'ready'; texts: TextSummary[]; declared: DeclaredLevel | null | 'unknown' };

// The Declared Level beside the Texts; only a lost session fails the Library over it.
const declaredLevel = () =>
  api.me().then(
    (learner) => learner.declared_level,
    (error) => {
      if (error instanceof ApiError && error.status === 401) throw error;
      return 'unknown' as const;
    },
  );

/** The Learner's Texts, newest first, as the API returns them. */
export default function Library() {
  const router = useRouter();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [state, setState] = useState<State>({ status: 'loading' });
  const [confirming, setConfirming] = useState<TextSummary | null>(null);
  const [levelNews, setLevelNews] = useState('');

  const [attempt, setAttempt] = useState(0);

  // Fetched from the browser on purpose: the Library goes through the same-origin proxy.
  useEffect(() => {
    let cancelled = false;
    Promise.all([api.listTexts(), declaredLevel()]).then(
      ([{ texts }, declared]) => {
        if (!cancelled) setState({ status: 'ready', texts, declared });
      },
      (error) => {
        if (cancelled) return;
        if (error instanceof ApiError && error.status === 401) router.replace('/login');
        else setState({ status: 'error' });
      },
    );
    return () => {
      cancelled = true;
    };
  }, [attempt, router]);

  function retry() {
    setState({ status: 'loading' });
    setAttempt((n) => n + 1);
  }

  function onDeleted(id: string) {
    setConfirming(null);
    setState((current) =>
      current.status === 'ready'
        ? { ...current, texts: current.texts.filter((text) => text.id !== id) }
        : current,
    );
    // The row that opened the dialog is gone, so focus can't return to it.
    headingRef.current?.focus();
  }

  function onDeclared(declared: DeclaredLevel) {
    setState((current) => (current.status === 'ready' ? { ...current, declared } : current));
  }

  // The answered question leaves the page, so focus goes back to the top of it.
  function onAnswered(declared: DeclaredLevel) {
    onDeclared(declared);
    setLevelNews(
      declared.level === null
        ? 'No Declared Level for now. You can set one here any time.'
        : `${hskLevelName(declared.level)} declared. ${wordsCoveredBy(declared.level)} are now Known, except any you’ve Marked.`,
    );
    headingRef.current?.focus();
  }

  function onLevelChanged(declared: DeclaredLevel) {
    onDeclared(declared);
    setLevelNews(
      declared.level === null
        ? 'Declared Level cleared.'
        : `Declared Level changed to ${hskLevelName(declared.level)}.`,
    );
  }

  const texts = state.status === 'ready' ? state.texts : [];
  const declared = state.status === 'ready' ? state.declared : 'unknown';
  // An answer to show: the Learner has been asked, and it loaded.
  const answered = declared !== null && declared !== 'unknown' ? declared : null;
  const hasTexts = texts.length > 0;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-4xl text-ink-700 focus:outline-none"
          >
            Library
          </h1>
          {(hasTexts || answered) && (
            <p className="font-ui mb-0 mt-1 flex flex-wrap items-baseline gap-x-2 text-sm text-ink-400">
              {hasTexts && <span>{texts.length === 1 ? '1 Text' : `${texts.length} Texts`}</span>}
              {hasTexts && answered && <span aria-hidden="true">·</span>}
              {answered && <DeclaredLevelSetting declared={answered} onChanged={onLevelChanged} />}
            </p>
          )}
        </div>
        {hasTexts && (
          <Link href="/space/texts/new" className={buttonClasses({ size: 'sm' })}>
            Add a Text
          </Link>
        )}
      </div>

      {state.status === 'loading' && (
        <p role="status" className="font-ui text-sm text-ink-400">
          Opening your Library…
        </p>
      )}

      {state.status === 'error' && (
        <div role="alert" className="rounded-xl border border-paper-300 bg-paper-50 p-6">
          <p className="mb-4 text-ink-500">Your Library didn’t load. Check your connection and try again.</p>
          <Button variant="secondary" size="sm" onClick={retry}>
            Try again
          </Button>
        </div>
      )}

      <p role="status" className={`font-ui text-sm text-ink-500 ${levelNews ? 'mb-6' : 'sr-only'}`}>
        {levelNews}
      </p>

      {declared === null && (
        <DeclaredLevelPrompt onDeclared={onAnswered} />
      )}

      {state.status === 'ready' && !hasTexts && <EmptyLibrary />}

      {hasTexts && (
        <ul className="border-t border-paper-300">
          {texts.map((text) => (
            <li
              key={text.id}
              className="group relative flex items-start gap-2 border-b border-paper-300 transition-colors duration-200 hover:bg-paper-200/60 focus-within:bg-paper-200/60"
            >
              <Link
                href={`/space/texts/${text.id}`}
                className="block min-w-0 flex-1 rounded-lg py-5 pl-3 pr-1 text-ink-500 hover:text-ink-500 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral-500 sm:pl-4"
              >
                <span className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="font-han truncate text-xl font-semibold text-ink-700">{text.title}</span>
                  <time
                    dateTime={text.created_at}
                    className="font-ui shrink-0 text-xs tabular-nums text-ink-400"
                  >
                    {formatDate(text.created_at)}
                  </time>
                </span>
                <span lang="zh" className="font-han mt-1.5 block truncate text-ink-400">
                  {text.preview}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setConfirming(text)}
                aria-label={`Delete “${text.title}”`}
                className="mr-1 mt-4 shrink-0 rounded-lg p-2.5 text-ink-400 transition-colors duration-200 hover:bg-paper-300 hover:text-coral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 sm:mr-2"
              >
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      )}

      <DeleteTextDialog text={confirming} onCancel={() => setConfirming(null)} onDeleted={onDeleted} />
    </>
  );
}

/** What a new Learner sees first: one clear way in, and what the Library is for. */
function EmptyLibrary() {
  return (
    <section
      aria-labelledby="empty-library-title"
      className="relative overflow-hidden rounded-xl border border-paper-300 bg-paper-50 px-6 py-12 shadow-md sm:px-12 sm:py-16"
    >
      {/* 读, "read": a watermark in the Library's own ink, not a claim. */}
      <span
        aria-hidden="true"
        className="font-han pointer-events-none absolute -bottom-8 -right-3 select-none text-[8rem] leading-none text-paper-300 sm:-right-2 sm:-top-10 sm:bottom-auto sm:text-[16rem]"
      >
        读
      </span>
      <div className="relative max-w-md">
        <h2 id="empty-library-title" className="mb-4 text-3xl text-ink-700 sm:text-4xl">
          Start with something you want to read.
        </h2>
        <p className="mb-8 text-ink-500">
          Paste any Chinese writing into your Library: a news story, a poem, a chapter of a novel.
          It stays here, yours alone, until you delete it.
        </p>
        <Link href="/space/texts/new" className={buttonClasses()}>
          Add your first Text
        </Link>
      </div>
    </section>
  );
}
