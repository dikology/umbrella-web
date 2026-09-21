'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError, api, type MarkedWord, type Sighting } from '@/lib/api';
import { formatDate } from '@/lib/format';
import Button, { buttonClasses } from './Button';
import { ChevronDownIcon } from './icons';
import { markedWordClasses } from './marked-word';

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; words: MarkedWord[] };

/**
 * The Learner's Marked Words, newest first, each opening onto the sentences it
 * was marked in.
 *
 * Unmarking is held back rather than sent at once, so it can be undone: re-marking
 * a Word needs a Segment of a live Text, and a Sighting from a deleted Text has
 * none. The held unmark reaches the API when another Word is unmarked, or when
 * the Learner leaves the page.
 */
// Words are keyed by their simplified form throughout, as the API keys them.
const without = (set: Set<string>, word: string) => {
  const next = new Set(set);
  next.delete(word);
  return next;
};

export default function MarkedWords() {
  const router = useRouter();
  const listRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  // The Word whose unmark is held, waiting to be undone or sent.
  const [held, setHeld] = useState<string | null>(null);
  // Unmarks on their way to the API: out of sight, but back if the API refuses.
  const [sending, setSending] = useState<Set<string>>(() => new Set());
  const [unmarkErrors, setUnmarkErrors] = useState<Set<string>>(() => new Set());
  // The Word Undo just brought back, whose Unmark button takes the focus Undo had.
  const restoreFocusTo = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.listMarkedWords().then(
      ({ marked_words }) => {
        if (!cancelled) setState({ status: 'ready', words: marked_words });
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

  // Leaving the page sends the held unmark: by navigating within the app, which
  // unmounts this, or by closing the tab, which never gets that far. Kept in a ref
  // as well as state, because the unmount has only the ref to read.
  const heldRef = useRef<string | null>(null);
  function hold(word: string | null) {
    heldRef.current = word;
    setHeld(word);
  }
  useEffect(() => {
    const flush = () => {
      const word = heldRef.current;
      if (word === null) return;
      api.unmarkWord(word, { keepalive: true }).catch(() => {});
      // A page restored from the back/forward cache must not offer to undo it.
      hold(null);
      dropFromList(word);
    };
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);

  function retry() {
    setState({ status: 'loading' });
    setAttempt((n) => n + 1);
  }

  function toggle(word: string) {
    setOpen((current) => (current.has(word) ? without(current, word) : new Set(current).add(word)));
  }

  // Only once the API has taken the Word away: until then it can come back.
  function dropFromList(word: string) {
    setState((current) =>
      current.status === 'ready'
        ? { status: 'ready', words: current.words.filter((w) => w.simplified !== word) }
        : current,
    );
  }

  async function sendUnmark(word: string) {
    setSending((current) => new Set(current).add(word));
    try {
      await api.unmarkWord(word);
      dropFromList(word);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        router.replace('/login');
      } else if (error instanceof ApiError && error.status === 404) {
        // Already unmarked, from the Reader in another tab: the outcome stands.
        dropFromList(word);
      } else {
        setUnmarkErrors((current) => new Set(current).add(word));
      }
    } finally {
      setSending((current) => without(current, word));
    }
  }

  function unmark(word: string) {
    setUnmarkErrors((current) => without(current, word));
    if (held !== null) void sendUnmark(held);
    hold(word);
  }

  function undo() {
    restoreFocusTo.current = held;
    hold(null);
  }

  useEffect(() => {
    const word = restoreFocusTo.current;
    if (word === null) return;
    restoreFocusTo.current = null;
    listRef.current?.querySelector<HTMLElement>(`[data-unmark="${CSS.escape(word)}"]`)?.focus();
  }, [held]);

  // The Reader shows which Words are marked, so an unmark still held has to land
  // before a Sighting's Text opens there, not race it.
  async function followSighting(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const word = heldRef.current;
    if (word === null) return;
    event.preventDefault();
    hold(null);
    await sendUnmark(word);
    router.push(href);
  }

  const words = (state.status === 'ready' ? state.words : []).filter((w) => !sending.has(w.simplified));
  const count = words.filter((w) => w.simplified !== held).length;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl text-ink-700">
          Marked Words
        </h1>
        {count > 0 && (
          <p className="font-ui mb-0 mt-1 text-sm text-ink-400">
            {count === 1 ? '1 Word' : `${count} Words`}, newest first
          </p>
        )}
      </div>

      {state.status === 'loading' && (
        <p role="status" className="font-ui text-sm text-ink-400">
          Gathering your Marked Words…
        </p>
      )}

      {state.status === 'error' && (
        <div role="alert" className="rounded-xl border border-paper-300 bg-paper-50 p-6">
          <p className="mb-4 text-ink-500">Your Marked Words didn’t load. Check your connection and try again.</p>
          <Button variant="secondary" size="sm" onClick={retry}>
            Try again
          </Button>
        </div>
      )}

      {state.status === 'ready' && words.length === 0 && sending.size === 0 && <NothingMarked />}

      {words.length > 0 && (
        <ul ref={listRef} aria-label="Marked Words" className="m-0 list-none border-t border-paper-300 p-0">
          {words.map((word) =>
            word.simplified === held ? (
              <HeldRow key={word.simplified} word={word.simplified} onUndo={undo} />
            ) : (
              <WordRow
                key={word.simplified}
                word={word}
                open={open.has(word.simplified)}
                error={unmarkErrors.has(word.simplified)}
                onToggle={() => toggle(word.simplified)}
                onUnmark={() => unmark(word.simplified)}
                onFollowSighting={followSighting}
              />
            ),
          )}
        </ul>
      )}
    </>
  );
}

function WordRow({
  word,
  open,
  error,
  onToggle,
  onUnmark,
  onFollowSighting,
}: {
  word: MarkedWord;
  open: boolean;
  error: boolean;
  onToggle: () => void;
  onUnmark: () => void;
  onFollowSighting: FollowSighting;
}) {
  const sightingsId = useId();
  const sightings = word.sightings.length;

  return (
    <li
      className={`border-b border-paper-300 transition-colors duration-200 ${open ? 'bg-paper-200/40' : 'hover:bg-paper-200/60 focus-within:bg-paper-200/60'}`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={open ? sightingsId : undefined}
          onClick={onToggle}
          className="group flex min-w-0 flex-1 items-start gap-4 rounded-lg py-5 pl-3 pr-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral-500 sm:gap-6 sm:pl-4"
        >
          <span lang="zh" className="font-han min-w-[3.5rem] shrink-0 break-all text-3xl leading-tight text-ink-800 sm:min-w-[5rem]">
            {word.simplified}
          </span>
          <span className="min-w-0 flex-1 pt-0.5">
            <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              {word.pinyin !== null ? (
                <span className="text-lg text-ink-700">{word.pinyin}</span>
              ) : (
                <span className="italic text-ink-400">Not in the dictionary</span>
              )}
              <span className="font-ui shrink-0 text-xs text-ink-400">
                Marked <time dateTime={word.marked_at} className="tabular-nums">{formatDate(word.marked_at)}</time>
              </span>
            </span>
            {word.definition !== null && (
              <span className="mt-0.5 block text-ink-500">{word.definition}</span>
            )}
            <span className="font-ui mt-1.5 flex items-center gap-1 text-xs font-medium text-ink-400 group-hover:text-ink-600">
              {sightings === 1 ? '1 Sighting' : `${sightings} Sightings`}
              <ChevronDownIcon
                width={14}
                height={14}
                className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              />
            </span>
          </span>
        </button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onUnmark}
          aria-label={`Unmark ${word.simplified}`}
          data-unmark={word.simplified}
          className="mr-1 mt-4 shrink-0 sm:mr-2"
        >
          Unmark
        </Button>
      </div>

      {error && (
        <div role="alert" className="font-ui mx-3 mb-4 rounded-xl border border-coral-500 bg-coral-50 px-3 py-2 text-sm text-coral-600 sm:mx-4">
          Couldn’t unmark this Word. It’s still marked; please try again.
        </div>
      )}

      {open && (
        <ul
          id={sightingsId}
          aria-label={`Sightings of ${word.simplified}`}
          className="m-0 list-none space-y-4 pb-6 pl-3 pr-3 motion-safe:animate-[word-card-in_180ms_cubic-bezier(0.16,1,0.3,1)] sm:pl-[calc(5rem+2.5rem)] sm:pr-4"
        >
          {word.sightings.map((sighting, i) => (
            <SightingItem key={i} sighting={sighting} onFollow={onFollowSighting} />
          ))}
        </ul>
      )}
    </li>
  );
}

type FollowSighting = (event: MouseEvent<HTMLAnchorElement>, href: string) => void;

function SightingItem({ sighting, onFollow }: { sighting: Sighting; onFollow: FollowSighting }) {
  const [before, word, after] = splitSentence(sighting);
  const href = sighting.text && `/space/texts/${sighting.text.id}`;

  return (
    <li>
      <div lang="zh" className="font-han break-words text-xl leading-[1.9] text-ink-700">
        {before}
        <mark className={`${markedWordClasses} text-ink-800`}>
          {word}
        </mark>
        {after}
      </div>
      <div className="font-ui mt-0.5 text-xs text-ink-400">
        {sighting.text !== null && href !== null ? (
          <>
            From{' '}
            <Link
              href={href}
              onClick={(event) => onFollow(event, href)}
              lang="zh"
              className="font-han text-sm"
            >
              {sighting.text.title}
            </Link>
          </>
        ) : (
          <span className="italic">From a deleted Text</span>
        )}
      </div>
    </li>
  );
}

// The API's offsets count code points, and JavaScript strings count UTF-16 units,
// so the sentence is sliced as code points.
function splitSentence({ sentence, word_start, word_end }: Sighting) {
  const points = [...sentence];
  return [
    points.slice(0, word_start).join(''),
    points.slice(word_start, word_end).join(''),
    points.slice(word_end).join(''),
  ];
}

/** An unmarked Word, briefly: the row it leaves behind until it is undone or sent. */
function HeldRow({ word, onUndo }: { word: string; onUndo: () => void }) {
  const undoRef = useRef<HTMLButtonElement>(null);
  const descriptionId = useId();
  // The Unmark button that was pressed is gone, so focus lands on its way back.
  useEffect(() => undoRef.current?.focus(), []);

  return (
    <li className="flex items-center justify-between gap-4 border-b border-paper-300 bg-paper-200/60 py-3 pl-3 pr-1 sm:pl-4 sm:pr-2">
      <div id={descriptionId} className="font-ui text-sm text-ink-500">
        Unmarked <span lang="zh" className="font-han text-base text-ink-700">{word}</span>
      </div>
      {/* Focus lands here, and the description says what Undo would undo. */}
      <button ref={undoRef} type="button" onClick={onUndo} aria-describedby={descriptionId} className={buttonClasses({ variant: 'ghost', size: 'sm' })}>
        Undo
      </button>
    </li>
  );
}

/** What a Learner sees before marking anything: how Words get here, and the way back to reading. */
function NothingMarked() {
  return (
    <section
      aria-labelledby="nothing-marked-title"
      className="relative overflow-hidden rounded-xl border border-paper-300 bg-paper-50 px-6 py-12 shadow-md sm:px-12 sm:py-16"
    >
      {/* 记, "to remember": the Library's watermark, in the same ink. */}
      <span
        aria-hidden="true"
        className="font-han pointer-events-none absolute -bottom-8 -right-3 select-none text-[8rem] leading-none text-paper-300 sm:-right-2 sm:-top-10 sm:bottom-auto sm:text-[16rem]"
      >
        记
      </span>
      <div className="relative max-w-md">
        <h2 id="nothing-marked-title" className="mb-4 text-3xl text-ink-700 sm:text-4xl">
          The Words you don’t know yet gather here.
        </h2>
        <p className="mb-8 text-ink-500">
          Open a Text in your Library, tap a Word in the Reader and Mark it. It stays marked in
          every Text you read, and the sentence you found it in is kept here with it.
        </p>
        <Link href="/space" className={buttonClasses()}>
          Go to your Library
        </Link>
      </div>
    </section>
  );
}
