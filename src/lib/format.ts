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
