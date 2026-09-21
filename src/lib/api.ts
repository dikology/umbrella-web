import { z } from "zod";

// One schema per API payload: validates responses and documents the contract.

export const learnerSchema = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string(),
  date_of_birth: z.string(),
  created_at: z.string(),
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

// A Text as the Reader opens it. The response also carries segments, words and
// marked words; this schema grows to cover them when the Reader needs them.
export const textSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  created_at: z.string(),
});
export type Text = z.infer<typeof textSchema>;

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
  init: { method: string; body?: unknown },
  schema?: z.ZodType<T>,
): Promise<T> {
  const response = await fetch(`/api/v1${path}`, {
    method: init.method,
    credentials: "include",
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
  listTexts: () => request("/texts", { method: "GET" }, librarySchema),
  addText: (body: AddTextRequest) =>
    request("/texts", { method: "POST", body }, textSummarySchema),
  openText: (id: string) =>
    request(`/texts/${encodeURIComponent(id)}`, { method: "GET" }, textSchema),
  deleteText: (id: string) =>
    request<void>(`/texts/${encodeURIComponent(id)}`, { method: "DELETE" }),
};
