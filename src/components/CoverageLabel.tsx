import type { Coverage } from '@/lib/api';
import { coverageBandName, coveragePercent } from '@/lib/coverage';

/**
 * One Learner's Coverage of one Text, with its Coverage Band: "94% Coverage · stretch".
 * The Coverage Band is said in words, never in colour: vermilion is kept for acting on.
 */
export default function CoverageLabel({ coverage }: { coverage: Coverage }) {
  return (
    <>
      <span className="tabular-nums">{coveragePercent(coverage)}%</span> Coverage
      <span aria-hidden="true"> · </span>
      {coverageBandName(coverage.band)}
    </>
  );
}
