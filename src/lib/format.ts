const addedDate = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });

/** When a Text went into the Library, as a Learner reads a date in their own locale. */
export function formatAddedDate(iso: string) {
  return addedDate.format(new Date(iso));
}
