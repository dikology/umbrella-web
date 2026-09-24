'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError, api, type HskLevelProgress, type Progress as ProgressData, type VocabularyDay } from '@/lib/api';
import { formatCount } from '@/lib/format';
import { hskLevelName } from '@/lib/hsk';
import Button, { buttonClasses } from './Button';
import VocabularyChart from './VocabularyChart';

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; progress: ProgressData };

/**
 * How a Learner is getting on: their Vocabulary over time, how much of each HSK
 * Level they know, and what they have finished and marked. Never a single HSK
 * Level: a few pasted Texts can't support one honestly.
 */
export default function Progress() {
  const router = useRouter();
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    api.progress(Intl.DateTimeFormat().resolvedOptions().timeZone).then(
      (progress) => {
        if (!cancelled) setState({ status: 'ready', progress });
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

  return (
    <>
      <h1 className="mb-8 text-4xl text-ink-700">Progress</h1>

      {state.status === 'loading' && (
        <p role="status" className="font-ui text-sm text-ink-400">
          Counting your Known Words…
        </p>
      )}

      {state.status === 'error' && (
        <div role="alert" className="rounded-xl border border-paper-300 bg-paper-50 p-6">
          <p className="mb-4 text-ink-500">Your Progress didn’t load. Check your connection and try again.</p>
          <Button variant="secondary" size="sm" onClick={retry}>
            Try again
          </Button>
        </div>
      )}

      {state.status === 'ready' &&
        (isEmpty(state.progress) ? <NothingYet /> : <ProgressReport progress={state.progress} />)}
    </>
  );
}

// Nothing declared, read or unmarked yet: no Known Word, so no line to draw.
const isEmpty = (progress: ProgressData) => progress.vocabulary.length === 0 && progress.texts_finished === 0;

const plural = (count: number, one: string, many: string) =>
  `${formatCount(count)} ${count === 1 ? one : many}`;

function ProgressReport({ progress }: { progress: ProgressData }) {
  return (
    <div className="space-y-14">
      <Vocabulary days={progress.vocabulary} />
      <HskLevels levels={progress.hsk_levels} />

      <p className="m-0 flex flex-wrap gap-x-2 border-t border-paper-300 pt-5 text-ink-500">
        <span>{plural(progress.texts_finished, 'Text finished', 'Texts finished')}</span>
        <span aria-hidden="true" className="text-ink-300">·</span>
        <span>{plural(progress.words_marked, 'Word marked', 'Words marked')}</span>
      </p>
    </div>
  );
}

/** The Vocabulary's size today, and how it got there. */
function Vocabulary({ days }: { days: VocabularyDay[] }) {
  // Empty when every Word of every finished Text was Marked: nothing Known yet.
  const today = days.at(-1);
  const known = today?.known ?? 0;
  const declared = today?.declared ?? 0;

  return (
    <section aria-labelledby="vocabulary-title">
      <h2 id="vocabulary-title" className="mb-1 text-2xl text-ink-700">
        Vocabulary
      </h2>
      <p className="mb-6 text-xl text-ink-600">
        {plural(known, 'Known Word', 'Known Words')}
        {declared > 0 && (
          <span className="text-ink-500">, {formatCount(declared)} of them declared</span>
        )}
        .
      </p>
      {/* A line needs two days to be one. */}
      {days.length > 1 && <VocabularyChart days={days} />}
      {days.length === 1 && (
        <p className="max-w-prose text-ink-500">
          Your Vocabulary’s line starts today. Come back after another day of reading to see it grow.
        </p>
      )}
    </section>
  );
}

/** Each HSK Level as Known against its size: how much of each level, never a verdict. */
function HskLevels({ levels }: { levels: HskLevelProgress[] }) {
  return (
    <section aria-labelledby="hsk-levels-title">
      <h2 id="hsk-levels-title" className="mb-1 text-2xl text-ink-700">
        HSK Levels
      </h2>
      <p className="mb-6 max-w-prose text-ink-500">
        How many of each level’s Words are in your Vocabulary.
      </p>
      <ul aria-label="HSK Levels" className="m-0 list-none space-y-4 p-0">
        {levels.map(({ level, known, size }) => {
          const share = size === 0 ? 0 : known / size;
          return (
            <li key={level} className="grid grid-cols-[5.5rem_1fr] items-center gap-x-4 gap-y-1 sm:grid-cols-[6rem_1fr_11rem]">
              <span className="font-ui text-sm font-medium text-ink-600">{hskLevelName(level)}</span>
              {/* The track is a lighter step of the fill, so the share reads across the whole bar. */}
              <span aria-hidden="true" className="h-2 overflow-hidden rounded-sm bg-paper-300">
                <span
                  className="block h-full rounded-sm bg-ink-500 motion-safe:transition-[width] motion-safe:duration-500"
                  style={{ width: `${share * 100}%` }}
                />
              </span>
              <span className="font-ui col-start-2 text-sm tabular-nums text-ink-500 sm:col-start-auto sm:text-right">
                {formatCount(known)} of {formatCount(size)} Known
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** What a Learner sees before their Vocabulary has a single Word: the way to one. */
function NothingYet() {
  return (
    <section
      aria-labelledby="nothing-yet-title"
      className="relative overflow-hidden rounded-xl border border-paper-300 bg-paper-50 px-6 py-12 shadow-md sm:px-12 sm:py-16"
    >
      {/* 进, "to advance": the same watermark ink as the Library's and Marked Words'. */}
      <span
        aria-hidden="true"
        className="font-han pointer-events-none absolute -bottom-8 -right-3 select-none text-[8rem] leading-none text-paper-300 sm:-right-2 sm:-top-10 sm:bottom-auto sm:text-[16rem]"
      >
        进
      </span>
      <div className="relative max-w-md">
        <h2 id="nothing-yet-title" className="mb-4 text-3xl text-ink-700 sm:text-4xl">
          Your Vocabulary starts with your first Text.
        </h2>
        <p className="mb-8 text-ink-500">
          Finish a Text in your Library and every Word you didn’t Mark becomes Known. Your
          Vocabulary grows from there, day by day, and this page draws it.
        </p>
        <Link href="/space" className={buttonClasses()}>
          Go to your Library
        </Link>
      </div>
    </section>
  );
}
