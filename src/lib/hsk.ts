import { hskLevelSchema, type HskLevel } from './api';

/** Every HSK Level, lowest first. */
export const HSK_LEVELS: readonly HskLevel[] = [...hskLevelSchema.values];

/** An HSK Level as a Learner reads it: "HSK 3", or "Advanced" for bands 7–9. */
export function hskLevelName(level: HskLevel) {
  return level === 'advanced' ? 'Advanced' : `HSK ${level}`;
}

/** Which way a change of Declared Level goes; none sits below HSK 1. */
export function levelChange(from: HskLevel | null, to: HskLevel | null): 'raise' | 'lower' | 'same' {
  const rank = (level: HskLevel | null) => (level === null ? 0 : HSK_LEVELS.indexOf(level) + 1);
  if (rank(to) > rank(from)) return 'raise';
  if (rank(to) < rank(from)) return 'lower';
  return 'same';
}

/** The Words a Declared Level makes Known, as a plural subject: "Words at HSK 3 and below". */
export function wordsCoveredBy(level: HskLevel) {
  if (level === 'advanced') return 'All HSK Words';
  if (level === 1) return 'Words at HSK 1';
  return `Words at HSK ${level} and below`;
}
