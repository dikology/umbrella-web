'use client';

import type { Coverage } from '@/lib/api';
import { formatDate } from '@/lib/format';
import Button from './Button';
import CoverageLabel from './CoverageLabel';

interface FinishTextProps {
  coverage: Coverage | null;
  /** When the Learner last finished the Text, or null if they never have. */
  finishedAt: string | null;
  /** A finish, or a mark, is on its way to the API. */
  busy: boolean;
  /** What the last finish did, said briefly; empty otherwise. */
  news: string;
  failed: boolean;
  onFinish: () => void;
}

/**
 * The end of a Text: the Learner's own statement that they read it through. It
 * says what a finish does before it is pressed, because a finish has no undo: a
 * Word the Learner didn't know after all, they mark.
 */
export default function FinishText({ coverage, finishedAt, busy, news, failed, onFinish }: FinishTextProps) {
  return (
    <section aria-label="Finish this Text" className="mt-16 border-t border-paper-300 pt-8">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {/* Paper, not vermilion: an open Word card's Mark is the red on this page. */}
        <Button
          variant="secondary"
          onClick={onFinish}
          // aria-disabled, not disabled: a disabled button drops focus to <body>.
          aria-disabled={busy}
          className={`shrink-0 ${busy ? 'cursor-progress opacity-60' : ''}`}
        >
          {finishedAt ? 'Finish again' : 'Finish'}
        </Button>
        <p className="font-ui mb-0 text-sm text-ink-500">Every Word you haven’t Marked becomes Known.</p>
      </div>

      {(coverage || finishedAt) && (
        <p className="font-ui mb-0 mt-4 text-xs text-ink-400">
          {coverage && <CoverageLabel coverage={coverage} />}
          {coverage && finishedAt && <span aria-hidden="true"> · </span>}
          {finishedAt && (
            <>
              Last finished <time dateTime={finishedAt}>{formatDate(finishedAt)}</time>
            </>
          )}
        </p>
      )}

      <p role="status" className={`font-ui text-sm text-ink-700 ${news ? 'mb-0 mt-4' : 'sr-only'}`}>
        {news}
      </p>

      {failed && (
        <div role="alert" className="font-ui mt-4 rounded-xl border border-coral-500 bg-coral-50 px-3 py-2 text-sm text-coral-600">
          Couldn’t finish this Text. Please try again.
        </div>
      )}
    </section>
  );
}
