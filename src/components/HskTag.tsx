import type { HskLevel } from '@/lib/api';
import { hskLevelName } from '@/lib/hsk';

/** A Word's HSK Level, wherever the Word is shown: "HSK 3", or "Advanced". */
export default function HskTag({ level }: { level: HskLevel }) {
  return (
    <span className="font-ui inline-flex shrink-0 items-center rounded-sm border border-paper-400 px-1.5 py-px text-xs font-medium leading-5 text-ink-500">
      {hskLevelName(level)}
    </span>
  );
}
