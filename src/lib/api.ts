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
};
