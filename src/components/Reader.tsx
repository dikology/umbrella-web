'use client';

import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import { ApiError, api, type Segment, type Text } from '@/lib/api';
import { coverageOf, knownAfterFinishing } from '@/lib/coverage';
import { formatDate } from '@/lib/format';
import CoverageLabel from './CoverageLabel';
import FinishText from './FinishText';
import { markedWordClasses } from './marked-word';
import WordCard, { type CardPlacement } from './WordCard';

// Below Tailwind's `sm`, a card hung off a Word would cover the line it explains,
// so it becomes a sheet across the bottom instead.
const WIDE = '(min-width: 640px)';

function subscribeToWidth(onChange: () => void) {
  const query = window.matchMedia(WIDE);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function useWide() {
  return useSyncExternalStore(
    subscribeToWidth,
    () => window.matchMedia(WIDE).matches,
    () => true,
  );
}

const GAP = 8;

// How long "Finished. 12 Words became Known." stays before the Text has the page back.
const FINISH_NEWS_MS = 8000;

const withWord = (set: Set<string>, word: string, on: boolean) => {
  const next = new Set(set);
  if (on) next.add(word);
  else next.delete(word);
  return next;
};

// Every Word in the Text carries its Segment's index, and nothing else does.
const WORD = '[data-index]';

/**
 * A Text to read: its Words open their Dictionary Entries, and can be marked.
 * Marks belong to the Learner, so marking one Word highlights it wherever it
 * appears here, and the highlight changes before the API has answered.
 *
 * Coverage is recomputed here as the Learner marks, from the Known Words the Text
 * came with: marking a Word takes it out of them, and unmarking puts it in.
 */
export default function Reader({ text }: { text: Text }) {
  const router = useRouter();
  const wide = useWide();

  const [marked, setMarked] = useState(() => new Set(text.marked_words));
  const [known, setKnown] = useState(() => new Set(text.known_words));
  const coverage = useMemo(() => coverageOf(text.words, known), [text.words, known]);
  const [finishedAt, setFinishedAt] = useState(text.finished_at);
  const [isFinishing, setIsFinishing] = useState(false);
  const [finishNews, setFinishNews] = useState('');
  const [finishFailed, setFinishFailed] = useState(false);
  // The Segment whose card is open, by its index in the Text.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [markError, setMarkError] = useState<{ word: string; message: string } | null>(null);
  const [placement, setPlacement] = useState<CardPlacement | null>(null);
  // The Word whose Mark or Unmark is on its way to the API.
  const [pendingWord, setPendingWord] = useState<string | null>(null);
  // A mark and a finish each change the Known Words, so one waits for the other.
  const busy = isFinishing || pendingWord !== null;
  const [sheetHeight, setSheetHeight] = useState(0);

  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // Set between a press on a Word and its click, so the card that loses focus to
  // that Word stays open for the click to switch it, rather than closing first.
  const pressingWord = useRef(false);

  const openSegment = openIndex === null ? null : text.segments[openIndex];
  const wordAt = useCallback(
    (index: number) => textRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`) ?? null,
    [],
  );

  const close = useCallback(
    (restoreFocus: boolean) => {
      if (openIndex === null) return;
      pressingWord.current = false;
      setOpenIndex(null);
      setPlacement(null);
      setSheetHeight(0);
      if (restoreFocus) wordAt(openIndex)?.focus();
    },
    [openIndex, wordAt],
  );

  function toggleCard(index: number) {
    setMarkError(null);
    if (openIndex === index) {
      close(false);
      return;
    }
    setPlacement(null);
    setOpenIndex(index);
  }

  // Hang the card below its Word, or above it when the viewport runs out, and keep
  // it inside the Text's column. On a phone, lift the Word clear of the sheet.
  // Placed again whenever the card changes size, as when an error appears in it.
  useLayoutEffect(() => {
    if (openIndex === null) return;
    const card = cardRef.current;
    const anchor = wordAt(openIndex);
    if (!card || !anchor) return;

    function place() {
      if (!card || !anchor) return;
      const anchorBox = anchor.getClientRects()[0] ?? anchor.getBoundingClientRect();
      if (!wide) {
        setSheetHeight(card.offsetHeight);
        const sheetTop = window.innerHeight - card.offsetHeight;
        if (anchorBox.bottom > sheetTop - GAP * 2) {
          requestAnimationFrame(() => window.scrollBy({ top: anchorBox.bottom - sheetTop + GAP * 6 }));
        }
        return;
      }
      const container = card.offsetParent?.getBoundingClientRect();
      if (!container) return;
      const width = card.offsetWidth;
      const height = card.offsetHeight;
      const left = Math.max(0, Math.min(anchorBox.left - container.left, container.width - width));
      const fitsBelow = anchorBox.bottom + GAP + height <= window.innerHeight;
      const fitsAbove = anchorBox.top - GAP - height >= 0;
      const top =
        fitsBelow || !fitsAbove
          ? anchorBox.bottom - container.top + GAP
          : anchorBox.top - container.top - GAP - height;
      setPlacement({ top, left });
    }

    place();
    const resized = new ResizeObserver(place);
    resized.observe(card);
    window.addEventListener('resize', place);
    return () => {
      resized.disconnect();
      window.removeEventListener('resize', place);
    };
  }, [openIndex, wide, wordAt]);

  // Focus follows the card in, so Tab reaches Mark next.
  useEffect(() => {
    if (openIndex !== null) cardRef.current?.focus({ preventScroll: true });
  }, [openIndex]);

  // Escape closes the card and hands focus back to its Word. A press anywhere but
  // the card or another Word closes it and leaves focus where it lands.
  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
      }
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Element | null;
      if (cardRef.current?.contains(target)) return;
      if (target?.closest(WORD)) {
        pressingWord.current = true;
        return;
      }
      close(false);
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openIndex, close]);

  async function toggleMark(segment: Segment) {
    const word = segment.simplified;
    if (word === null || busy) return;
    const wasMarked = marked.has(word);
    const wasKnown = known.has(word);
    const setWord = (isMarked: boolean, isKnown: boolean) => {
      setMarked((current) => withWord(current, word, isMarked));
      setKnown((current) => withWord(current, word, isKnown));
    };

    setPendingWord(word);
    setMarkError(null);
    // What the last finish did no longer matches the Coverage once a mark changes it.
    setFinishNews('');
    // The latest act wins: a Marked Word is never Known, and an unmarked one is.
    setWord(!wasMarked, wasMarked);
    try {
      if (wasMarked) await api.unmarkWord(word);
      else await api.markWord(segment.id);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        router.replace('/login');
        return;
      }
      // Unmarking a Word that is no longer marked has already happened.
      if (!(wasMarked && error instanceof ApiError && error.status === 404)) {
        setWord(wasMarked, wasKnown);
        setMarkError({
          word,
          message: wasMarked
            ? 'Couldn’t unmark this Word. Please try again.'
            : 'Couldn’t mark this Word. Please try again.',
        });
      }
    } finally {
      setPendingWord(null);
    }
  }

  async function finish() {
    if (busy) return;
    setIsFinishing(true);
    setFinishFailed(false);
    setFinishNews('');
    try {
      const finishing = await api.finishText(text.id);
      setFinishedAt(finishing.finished_at);
      setKnown((current) => knownAfterFinishing(text.words, marked, current));
      const added = finishing.known_words_added;
      setFinishNews(
        added === 0
          ? 'Finished. No new Words became Known.'
          : `Finished. ${added === 1 ? '1 Word' : `${added} Words`} became Known.`,
      );
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        router.replace('/login');
        return;
      }
      setFinishFailed(true);
    } finally {
      setIsFinishing(false);
    }
  }

  useEffect(() => {
    if (!finishNews) return;
    const timeout = setTimeout(() => setFinishNews(''), FINISH_NEWS_MS);
    return () => clearTimeout(timeout);
  }, [finishNews]);

  function wordIndexOf(event: MouseEvent | KeyboardEvent) {
    const target = (event.target as Element).closest<HTMLElement>(WORD);
    return target ? Number(target.dataset.index) : null;
  }

  return (
    <article className="relative mt-6" style={sheetHeight ? { paddingBottom: sheetHeight } : undefined}>
      <header className="mb-10 border-b border-paper-300 pb-6">
        <h1 className="font-han mb-2 text-4xl leading-tight text-ink-700 break-words sm:text-5xl">
          {text.title}
        </h1>
        <div className="font-ui text-sm text-ink-400">
          Added <time dateTime={text.created_at}>{formatDate(text.created_at)}</time>
          {coverage && (
            <>
              <span aria-hidden="true"> · </span>
              {/* Live, so a mark's effect on Coverage is heard as well as seen. */}
              <span role="status">
                <CoverageLabel coverage={coverage} />
              </span>
            </>
          )}
          <span aria-hidden="true"> · </span>
          Tap or click a Word for its Dictionary Entries
        </div>
      </header>

      <div
        ref={textRef}
        lang="zh"
        onClick={(event) => {
          pressingWord.current = false;
          const index = wordIndexOf(event);
          if (index !== null) toggleCard(index);
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          const index = wordIndexOf(event);
          if (index === null) return;
          event.preventDefault();
          toggleCard(index);
        }}
        className="font-han max-w-[36em] whitespace-pre-wrap break-words text-xl leading-[1.9] tracking-normal text-ink-700 sm:text-2xl"
      >
        {text.segments.map((segment, index) =>
          segment.is_word && segment.simplified !== null ? (
            <WordSpan
              key={segment.id}
              index={index}
              surface={segment.surface}
              marked={marked.has(segment.simplified)}
              open={openIndex === index}
            />
          ) : (
            segment.surface
          ),
        )}
      </div>
      <span id="marked-word-note" hidden>
        Marked Word
      </span>

      {openSegment && openSegment.simplified !== null && (
        <WordCard
          ref={cardRef}
          surface={openSegment.surface}
          word={text.words[openSegment.simplified]}
          marked={marked.has(openSegment.simplified)}
          error={markError?.word === openSegment.simplified ? markError.message : null}
          sheet={!wide}
          placement={placement}
          busy={busy}
          onToggleMark={() => toggleMark(openSegment)}
          onClose={() => close(true)}
          onFocusLeave={() => {
            if (!pressingWord.current) close(false);
          }}
        />
      )}

      <FinishText
        coverage={coverage}
        finishedAt={finishedAt}
        busy={busy}
        news={finishNews}
        failed={finishFailed}
        onFinish={finish}
      />

      <footer className="font-ui mt-12 border-t border-paper-300 pt-4 text-xs text-ink-400">
        Dictionary Entries from{' '}
        <a href="https://cc-cedict.org/wiki/" target="_blank" rel="noreferrer">
          CC-CEDICT
        </a>
        , used under{' '}
        <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">
          CC BY-SA 4.0
        </a>
        .
      </footer>
    </article>
  );
}

// Thousands of these can sit in one Text, so each re-renders only when its own
// mark or open state changes. Clicks and keys are handled once, on the Text.
const WordSpan = memo(function WordSpan({
  index,
  surface,
  marked,
  open,
}: {
  index: number;
  surface: string;
  marked: boolean;
  open: boolean;
}) {
  return (
    <span
      role="button"
      tabIndex={0}
      data-index={index}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-describedby={marked ? 'marked-word-note' : undefined}
      className={[
        'cursor-pointer rounded-[3px] transition-colors duration-150 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500',
        marked ? `${markedWordClasses} hover:bg-coral-100` : 'hover:bg-paper-300',
        open ? 'ring-[1.5px] ring-ink-500' : '',
      ].join(' ')}
    >
      {surface}
    </span>
  );
});
