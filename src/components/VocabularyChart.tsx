'use client';

import { useId } from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
  type TooltipValueType,
} from 'recharts';
import type { VocabularyDay } from '@/lib/api';
import { formatCount, formatDay, formatShortDay } from '@/lib/format';

// The page's one vermilion mark: the Vocabulary itself. The declared part is paper
// and pencil hatching, so it reads as set apart without a second hue (DESIGN.md
// allows one accent). The legend and the table carry its identity too.
const KNOWN = '#C0392B'; // coral-600
const DECLARED_FILL = '#EDE7D8'; // paper-300
const DECLARED_INK = '#A8A297'; // ink-300
const GRID = '#EDE7D8'; // paper-300
const AXIS_TEXT = '#6B6456'; // ink-400
const SURFACE = '#FAF8F0'; // paper-100

// Round ticks from 0: four steps of 1, 2, 2.5 or 5 times a power of ten.
function roundTicks(max: number) {
  const rough = Math.max(max, 1) / 4;
  const power = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * power).find((s) => s >= rough)!;
  const top = Math.max(1, Math.ceil(max / step));
  return Array.from({ length: top + 1 }, (_, i) => i * step);
}

/** The Vocabulary's size day by day, with the part the Learner declared shaded apart from reading. */
export default function VocabularyChart({ days }: { days: VocabularyDay[] }) {
  // useId's colons aren't safe inside url(#…), and this runs on the server too.
  const hatchId = `declared-hatch-${useId().replace(/[^\w-]/g, '')}`;
  const hasDeclared = days.some((day) => day.declared > 0);
  const hatch = `url(#${hatchId})`;
  const ticks = roundTicks(Math.max(...days.map((day) => day.known)));

  return (
    <figure className="m-0">
      <figcaption className="font-ui mb-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-500">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-0.5 w-4 rounded-sm" style={{ background: KNOWN }} />
          Known Words
        </span>
        {hasDeclared && (
          <span className="inline-flex items-center gap-1.5">
            <svg aria-hidden="true" width="12" height="12" className="rounded-sm">
              <rect width="12" height="12" fill={hatch} />
            </svg>
            Declared: known from your Declared Level, not from reading
          </span>
        )}
      </figcaption>

      {/* The chart is for the eye; the table below carries every value for everyone. */}
      <div aria-hidden="true" className="h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={days} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} accessibilityLayer={false}>
            <defs>
              <pattern id={hatchId} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="6" height="6" fill={DECLARED_FILL} />
                <line x1="0" y1="0" x2="0" y2="6" stroke={DECLARED_INK} strokeWidth="1" />
              </pattern>
            </defs>
            <CartesianGrid vertical={false} stroke={GRID} />
            <XAxis
              dataKey="date"
              tickFormatter={formatShortDay}
              tick={{ fill: AXIS_TEXT, fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: GRID }}
              minTickGap={24}
              tickMargin={8}
            />
            <YAxis
              ticks={ticks}
              domain={[0, ticks.at(-1)!]}
              tickFormatter={formatCount}
              tick={{ fill: AXIS_TEXT, fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              width={48}
            />
            <Tooltip
              content={DayReadout}
              cursor={{ stroke: DECLARED_INK, strokeWidth: 1 }}
              isAnimationActive={false}
            />
            {hasDeclared && (
              <Area
                dataKey="declared"
                type="stepAfter"
                fill={hatch}
                fillOpacity={1}
                stroke={DECLARED_INK}
                strokeWidth={1}
                activeDot={false}
                isAnimationActive={false}
                label={<DeclaredLabel lastIndex={days.length - 1} />}
              />
            )}
            <Line
              dataKey="known"
              type="linear"
              stroke={KNOWN}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              dot={false}
              activeDot={{ r: 4, fill: KNOWN, stroke: SURFACE, strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <details className="font-ui mt-3 text-sm text-ink-500">
        <summary className="cursor-pointer rounded-sm text-ink-500 hover:text-ink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500">
          Show as a table
        </summary>
        <div className="mt-3 max-h-80 overflow-y-auto rounded-xl border border-paper-300 bg-paper-50">
          <table className="w-full border-collapse text-left tabular-nums">
            <thead className="sticky top-0 bg-paper-50 text-xs text-ink-400">
              <tr>
                <th scope="col" className="px-4 py-2 font-medium">Day</th>
                <th scope="col" className="px-4 py-2 text-right font-medium">Known Words</th>
                <th scope="col" className="px-4 py-2 text-right font-medium">Declared</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day.date} className="border-t border-paper-300">
                  <th scope="row" className="px-4 py-1.5 font-normal text-ink-600">
                    <time dateTime={day.date}>{formatDay(day.date)}</time>
                  </th>
                  <td className="px-4 py-1.5 text-right text-ink-700">{formatCount(day.known)}</td>
                  <td className="px-4 py-1.5 text-right">{formatCount(day.declared)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

/** "Declared", set inside the band's right end, so the band names itself where it lies. */
function DeclaredLabel({ lastIndex, index, x, y }: { lastIndex: number; index?: number; x?: number; y?: number }) {
  if (index !== lastIndex || x === undefined || y === undefined) return null;
  return (
    <text x={x - 8} y={y + 18} textAnchor="end" fill={AXIS_TEXT} fontSize={12} fontWeight={500}>
      Declared
    </text>
  );
}

/** One day's values under the crosshair: the numbers lead, the names follow. */
function DayReadout({ active, payload }: TooltipContentProps<TooltipValueType, string | number>) {
  const day = payload?.[0]?.payload as VocabularyDay | undefined;
  if (!active || !day) return null;
  return (
    <div className="font-ui rounded-lg border border-paper-300 bg-paper-50 px-3 py-2 text-xs text-ink-500 shadow-md">
      <div className="mb-1 text-ink-400">{formatDay(day.date)}</div>
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="inline-block h-0.5 w-3 rounded-sm" style={{ background: KNOWN }} />
        <span className="text-sm font-semibold tabular-nums text-ink-800">{formatCount(day.known)}</span>
        Known Words
      </div>
      {day.declared > 0 && (
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-0.5 w-3 rounded-sm" style={{ background: DECLARED_INK }} />
          <span className="text-sm font-semibold tabular-nums text-ink-800">{formatCount(day.declared)}</span>
          declared
        </div>
      )}
    </div>
  );
}
