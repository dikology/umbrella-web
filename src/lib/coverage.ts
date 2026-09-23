import type { Coverage, CoverageBand, Word } from './api';

// Mirror umbrella-api's COMFORTABLE_FROM and STRETCH_FROM, as percentages. Compared
// in whole numbers, so 98 of 100 is comfortable and not a float a hair below it.
const COMFORTABLE_FROM = 98;
const STRETCH_FROM = 90;

function coverageBandOf(known: number, running: number): CoverageBand {
  if (known * 100 >= COMFORTABLE_FROM * running) return 'comfortable';
  if (known * 100 >= STRETCH_FROM * running) return 'stretch';
  return 'too_hard';
}

/**
 * The Learner's Coverage of a Text as the Reader has it right now: its running
 * Words that count, and how many of them are Known. Null when none count, as the
 * API has it: such a Text has no Coverage, not 0% of it.
 */
export function coverageOf(words: Record<string, Word>, known: ReadonlySet<string>): Coverage | null {
  let running = 0;
  let knownRunning = 0;
  for (const [simplified, word] of Object.entries(words)) {
    if (!word.counts_toward_coverage) continue;
    running += word.running_count;
    if (known.has(simplified)) knownRunning += word.running_count;
  }
  if (running === 0) return null;
  return { known: knownRunning, running, share: knownRunning / running, band: coverageBandOf(knownRunning, running) };
}

/**
 * The Words a Learner knows once they finish a Text, as the API decides it: the
 * ones they already knew, and every Word with a Dictionary Entry they haven't Marked.
 */
export function knownAfterFinishing(
  words: Record<string, Word>,
  marked: ReadonlySet<string>,
  known: ReadonlySet<string>,
): Set<string> {
  const next = new Set(known);
  for (const [simplified, word] of Object.entries(words)) {
    if (word.counts_toward_coverage && !marked.has(simplified)) next.add(simplified);
  }
  return next;
}

/**
 * A Coverage as a whole percentage, rounded down: a Learner at 97.9% is still
 * short of comfortable, so the figure must never read 98%.
 */
export function coveragePercent({ known, running }: Coverage) {
  return Math.floor((known * 100) / running);
}

const COVERAGE_BAND_NAMES: Record<CoverageBand, string> = {
  comfortable: 'comfortable',
  stretch: 'stretch',
  too_hard: 'too hard',
};

/** A Coverage Band as a Learner reads it. */
export function coverageBandName(band: CoverageBand) {
  return COVERAGE_BAND_NAMES[band];
}
