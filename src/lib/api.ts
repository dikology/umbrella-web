import { z } from "zod";

// One schema per API payload: validates responses and documents the contract.

// An HSK Level as the API writes it: 1-6, and "advanced" for bands 7-9.
// Listed lowest first: `hskLevelSchema.values` keeps this order.
export const hskLevelSchema = z.literal([1, 2, 3, 4, 5, 6, "advanced"]);
export type HskLevel = z.infer<typeof hskLevelSchema>;

// A Learner's answer to "what's your HSK Level?": a level, or null if they skipped.
export const declaredLevelSchema = z.object({
  level: hskLevelSchema.nullable(),
  declared_at: z.string(),
});
export type DeclaredLevel = z.infer<typeof declaredLevelSchema>;

export const learnerSchema = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string(),
  date_of_birth: z.string(),
  created_at: z.string(),
  // Null until the Learner has been asked, which is not the same as skipping.
  declared_level: declaredLevelSchema.nullable(),
});
export type Learner = z.infer<typeof learnerSchema>;

export const errorEnvelopeSchema = z.object({
  error: z.object({ code: z.string(), message: z.string() }),
});

export const registerRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  consent: z.boolean(),
});
export type RegisterRequest = z.infer<typeof registerRequestSchema>;

export const loginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

// A Text as the Library lists it: enough to recognise it by, not to read.
export const textSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  created_at: z.string(),
  preview: z.string(),
});
export type TextSummary = z.infer<typeof textSummarySchema>;

export const librarySchema = z.object({ texts: z.array(textSummarySchema) });

export const dictionaryEntrySchema = z.object({
  simplified: z.string(),
  traditional: z.string(),
  pinyin: z.string(),
  pinyin_numbered: z.string(),
  definitions: z.array(z.string()),
});
export type DictionaryEntry = z.infer<typeof dictionaryEntrySchema>;

// What the Dictionary says about one Word: its own entries, or, when it has none,
// the entries of the longest parts it does know (ADR-0003 in umbrella-api).
export const wordSchema = z.object({
  entries: z.array(dictionaryEntrySchema),
  parts: z.array(z.object({ simplified: z.string(), entries: z.array(dictionaryEntrySchema) })),
});
export type Word = z.infer<typeof wordSchema>;

// One Segment in reading order. Render `surface`, not body[start:end]: the API's
// offsets count code points, and JavaScript strings count UTF-16 units.
export const segmentSchema = z.object({
  id: z.number(),
  surface: z.string(),
  // A Word's identity and its key in `words`; null for plain writing.
  simplified: z.string().nullable(),
  is_word: z.boolean(),
});
export type Segment = z.infer<typeof segmentSchema>;

// A Text as the Reader opens it: every Word's Dictionary Entries come with it, so
// a tap needs no request of its own.
export const textSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  created_at: z.string(),
  segments: z.array(segmentSchema),
  words: z.record(z.string(), wordSchema),
  marked_words: z.array(z.string()),
});
export type Text = z.infer<typeof textSchema>;

// One sentence a Word was marked in, copied out of its Text when it was marked.
// `word_start` and `word_end` count code points into `sentence`, as the API does.
export const sightingSchema = z.object({
  sentence: z.string(),
  word_start: z.number(),
  word_end: z.number(),
  sighted_at: z.string(),
  // Null once the Text is deleted; the sentence outlives it.
  text: z.object({ id: z.string(), title: z.string() }).nullable(),
});
export type Sighting = z.infer<typeof sightingSchema>;

// A Marked Word as the list shows it: pinyin and definition are the Word's first
// Dictionary Entry, both null for a Word the dictionary doesn't know.
export const markedWordSchema = z.object({
  simplified: z.string(),
  pinyin: z.string().nullable(),
  definition: z.string().nullable(),
  marked_at: z.string(),
  sightings: z.array(sightingSchema),
});
export type MarkedWord = z.infer<typeof markedWordSchema>;

export const markedWordsSchema = z.object({ marked_words: z.array(markedWordSchema) });

// Mirror umbrella-api's TITLE_MAX_LENGTH and BODY_MAX_LENGTH. The API counts
// code points, not UTF-16 units, so an astral Han character counts once here too.
export const TITLE_MAX_LENGTH = 200;
export const BODY_MAX_LENGTH = 20_000;

export const codePointLength = (value: string) => [...value].length;

// Where Han is written, as umbrella-api's segmentation defines it.
const HAN = /[〇㐀-䶿一-鿿豈-﫿\u{20000}-\u{3ffff}]/u;

// The API's own checks, run before the request so a Learner hears about them
// without a round trip. Both fields are stripped first, as the API strips them.
export const addTextRequestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "A Text needs a title.")
    .refine((title) => codePointLength(title) <= TITLE_MAX_LENGTH, {
      message: `A title is at most ${TITLE_MAX_LENGTH} characters.`,
    }),
  body: z
    .string()
    .trim()
    .min(1, "A Text needs something to read.")
    .refine((body) => codePointLength(body) <= BODY_MAX_LENGTH, {
      message: `A Text is at most ${BODY_MAX_LENGTH.toLocaleString("en")} characters.`,
      abort: true,
    })
    .refine((body) => HAN.test(body), {
      message: "A Text needs at least one Chinese character to read.",
    }),
});
export type AddTextRequest = z.infer<typeof addTextRequestSchema>;

/** An error response from the API, off the `{"error": {code, message}}` envelope. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  init: { method: string; body?: unknown; keepalive?: boolean },
  schema?: z.ZodType<T>,
): Promise<T> {
  const response = await fetch(`/api/v1${path}`, {
    method: init.method,
    credentials: "include",
    keepalive: init.keepalive,
    headers: init.body === undefined ? undefined : { "Content-Type": "application/json" },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });

  if (!response.ok) {
    const envelope = errorEnvelopeSchema.safeParse(await response.json().catch(() => null));
    if (envelope.success) {
      throw new ApiError(response.status, envelope.data.error.code, envelope.data.error.message);
    }
    throw new ApiError(response.status, "unknown_error", response.statusText || "Request failed.");
  }

  if (!schema) return undefined as T;
  return schema.parse(await response.json());
}

export const api = {
  register: (body: RegisterRequest) =>
    request("/auth/register", { method: "POST", body }, learnerSchema),
  login: (body: LoginRequest) => request("/auth/login", { method: "POST", body }, learnerSchema),
  refresh: () => request("/auth/refresh", { method: "POST" }, learnerSchema),
  logout: () => request<void>("/auth/logout", { method: "POST" }),
  me: () => request("/me", { method: "GET" }, learnerSchema),
  // Idempotent: the Learner holds one Declared Level, and null means none.
  declareLevel: (level: HskLevel | null) =>
    request("/me/declared-level", { method: "PUT", body: { level } }, declaredLevelSchema),
  listTexts: () => request("/texts", { method: "GET" }, librarySchema),
  addText: (body: AddTextRequest) =>
    request("/texts", { method: "POST", body }, textSummarySchema),
  openText: (id: string) =>
    request(`/texts/${encodeURIComponent(id)}`, { method: "GET" }, textSchema),
  deleteText: (id: string) =>
    request<void>(`/texts/${encodeURIComponent(id)}`, { method: "DELETE" }),
  // A Word is marked by the Segment it was tapped in, which gives it its Sighting,
  // and unmarked by its simplified form, everywhere at once.
  markWord: (segmentId: number) =>
    request<void>("/marked-words", { method: "POST", body: { segment_id: segmentId } }),
  // `keepalive` lets an unmark still reach the API as the page it was made on unloads.
  unmarkWord: (simplified: string, { keepalive = false } = {}) =>
    request<void>(`/marked-words/${encodeURIComponent(simplified)}`, { method: "DELETE", keepalive }),
  listMarkedWords: () => request("/marked-words", { method: "GET" }, markedWordsSchema),
};
