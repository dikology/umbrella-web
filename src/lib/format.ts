const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });

/** A day something happened, such as a Text added or a Word marked, as a Learner reads a date in their own locale. */
export function formatDate(iso: string) {
  return dateFormat.format(new Date(iso));
}

const countFormat = new Intl.NumberFormat();

/** A count as a Learner reads a number in their own locale: 1,240. */
export function formatCount(count: number) {
  return countFormat.format(count);
}

// A calendar day as the API writes it, "2026-09-04", already counted in the Learner's
// time zone: read as local midnight, never as UTC's.
const calendarDay = (day: string) => {
  const [year, month, date] = day.split('-').map(Number);
  return new Date(year, month - 1, date);
};
const shortDayFormat = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' });

/** A calendar day in full, in the Learner's locale: "Sep 4, 2026". */
export function formatDay(day: string) {
  return dateFormat.format(calendarDay(day));
}

/** A calendar day in short, for a chart's axis: "Sep 4". */
export function formatShortDay(day: string) {
  return shortDayFormat.format(calendarDay(day));
}
