import type { HskLevel } from '@/lib/api';

// How an HSK Level looks wherever a Learner picks one: in the first-visit
// question, and in the dialog that changes it. One look, so it reads as one choice.
export const levelTileClasses =
  'font-ui flex h-full w-full flex-col items-center justify-center rounded-xl border border-paper-400 bg-paper-200 px-2 text-ink-800 transition-all duration-200';

/** A level as a tile shows it: "HSK" small over the number, or "Advanced" over its bands. */
export function LevelFace({ level }: { level: HskLevel | null }) {
  if (level === null) {
    return <span className="font-display text-xl font-semibold leading-tight">None</span>;
  }
  // The caption follows the tile's own ink, so a checked (inverted) tile keeps it legible.
  if (level === 'advanced') {
    return (
      <>
        <span className="font-display text-xl font-semibold leading-tight">Advanced</span>{' '}
        <span className="text-xs opacity-75">HSK 7–9</span>
      </>
    );
  }
  return (
    <>
      <span className="text-xs opacity-75">HSK</span>{' '}
      <span className="font-display text-2xl font-semibold leading-tight tabular-nums">{level}</span>
    </>
  );
}
