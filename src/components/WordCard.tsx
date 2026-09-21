'use client';

import type { Ref } from 'react';
import type { DictionaryEntry, Word } from '@/lib/api';
import Button from './Button';
import { CloseIcon } from './icons';

/** Where a card sits in the Reader, measured from its Word. */
export interface CardPlacement {
  top: number;
  left: number;
}

interface WordCardProps {
  ref: Ref<HTMLDivElement>;
  /** The Word as the Text writes it, which may be traditional. */
  surface: string;
  word: Word | undefined;
  marked: boolean;
  /** A mark or unmark that failed, said in the card it was made from. */
  error: string | null;
  /** On a phone the card is a sheet across the bottom; otherwise it hangs off the Word. */
  sheet: boolean;
  /** Where the card sits beside its Word, once measured; null until then. */
  placement: CardPlacement | null;
  onToggleMark: () => void;
  onClose: () => void;
  /** Focus left the card for something outside it, as Tab and Shift+Tab do. */
  onFocusLeave: () => void;
  /** A Mark or Unmark is on its way to the API; another has to wait. */
  busy: boolean;
}

/**
 * A Word's Dictionary Entries and its Mark toggle. Everything shown here came with
 * the Text, so opening a card never waits on the network.
 */
export default function WordCard({
  ref,
  surface,
  word,
  marked,
  error,
  sheet,
  placement,
  busy,
  onToggleMark,
  onClose,
  onFocusLeave,
}: WordCardProps) {
  const entries = word?.entries ?? [];
  const parts = word?.parts ?? [];

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={surface}
      tabIndex={-1}
      onBlur={(event) => {
        const next = event.relatedTarget as Element | null;
        if (next && !event.currentTarget.contains(next)) onFocusLeave();
      }}
      // Unplaced, it stays invisible but focusable: focus moves in before it is measured.
      style={sheet ? undefined : placement ?? { opacity: 0, pointerEvents: 'none' }}
      className={
        sheet
          ? 'fixed inset-x-0 bottom-0 z-40 flex max-h-[70dvh] flex-col rounded-t-xl border-t border-paper-300 bg-paper-50 shadow-[0_-10px_15px_-3px_rgba(74,66,55,0.1)] outline-none motion-safe:animate-[sheet-in_280ms_cubic-bezier(0.16,1,0.3,1)]'
          : 'absolute z-40 flex max-h-[min(26rem,60vh)] w-[22rem] max-w-full flex-col rounded-xl border border-paper-300 bg-paper-50 shadow-xl outline-none motion-safe:animate-[word-card-in_180ms_cubic-bezier(0.16,1,0.3,1)]'
      }
    >
      <div className="flex items-start gap-3 border-b border-paper-300 px-5 pb-4 pt-4">
        <div lang="zh" className="font-han mr-auto min-w-0 break-words pt-0.5 text-3xl leading-tight text-ink-800">
          {surface}
        </div>
        <Button
          size="sm"
          variant={marked ? 'secondary' : 'primary'}
          onClick={onToggleMark}
          // aria-disabled, not disabled: a disabled button drops focus to <body>.
          aria-disabled={busy}
          className={`shrink-0 ${busy ? 'cursor-progress opacity-60' : ''}`}
        >
          {marked ? 'Unmark' : 'Mark'}
        </Button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-2 shrink-0 rounded-lg p-2 text-ink-400 transition-colors hover:bg-paper-200 hover:text-ink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
        >
          <CloseIcon />
        </button>
      </div>

      {error && (
        <div role="alert" className="font-ui mx-5 mt-3 rounded-xl border border-coral-500 bg-coral-50 px-3 py-2 text-sm text-coral-600">
          {error}
        </div>
      )}

      <div className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
        {entries.length > 0 ? (
          <Entries entries={entries} />
        ) : parts.length > 0 ? (
          <>
            <div className="mb-4 text-sm italic text-ink-400">Not in the dictionary as a whole. Its parts:</div>
            <div className="space-y-5">
              {parts.map((part, i) => (
                <section key={`${part.simplified}-${i}`}>
                  <h3 lang="zh" className="font-han mb-2 text-xl font-normal tracking-normal text-ink-800">
                    {part.simplified}
                  </h3>
                  <Entries entries={part.entries} />
                </section>
              ))}
            </div>
          </>
        ) : (
          <div className="text-sm italic text-ink-400">The dictionary has no entry for this Word.</div>
        )}
      </div>
    </div>
  );
}

function Entries({ entries }: { entries: DictionaryEntry[] }) {
  return (
    <div className="space-y-4">
      {entries.map((entry, i) => (
        <div key={`${entry.traditional}-${entry.pinyin_numbered}-${i}`}>
          <div className="mb-1 flex flex-wrap items-baseline gap-x-3 leading-snug">
            <span lang="zh" className="font-han text-lg text-ink-800">
              {entry.simplified}
              {entry.traditional !== entry.simplified && (
                <span className="text-ink-400"> · {entry.traditional}</span>
              )}
            </span>
            <span className="text-lg text-ink-700">{entry.pinyin}</span>
          </div>
          <ol className="mb-0 list-decimal space-y-0.5 pl-5 text-base leading-relaxed text-ink-600 marker:font-ui marker:text-xs marker:text-ink-400">
            {entry.definitions.map((definition, j) => (
              <li key={j}>{definition}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
