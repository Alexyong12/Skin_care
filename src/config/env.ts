import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

// NEXT_PUBLIC_* vars must be read as literal `process.env.X` so Next can inline them.
const parsed = schema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`,
  );
}

/** Validated, typed environment. Import this instead of using process.env directly. */
export const env = {
  API_URL: parsed.data.NEXT_PUBLIC_API_URL,
} as const;
