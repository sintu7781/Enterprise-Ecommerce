import dotenv from "dotenv";

import type { StringValue } from "ms";

import { z } from "zod";

dotenv.config({
  path: ".env",
});

const durationSchema = z
  .string()
  .trim()
  .regex(
    /^(\d+)(ms|s|m|h|d|w|y)$/,
    "Duration must be like 15m, 1h, 7d, 30d, etc.",
  )
  .transform((value) => value as StringValue);

const envSchema = z.object({
  NODE_ENV: z
    .enum([
      "development",
      "test",
      "production",
    ])
    .default("development"),

  APP_NAME: z.string().trim().min(1),

  HOST: z.string().trim().min(1),

  PORT: z.coerce
    .number()
    .int()
    .min(1)
    .max(65535),
  
  FRONTEND_URL: z.url(),
  
  CORS_ORIGIN: z.string(),

  DATABASE_URL: z.url(),

  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
    "silent",
  ]),

  JWT_ACCESS_SECRET: z
    .string()
    .trim()
    .min(
      32,
      "JWT_ACCESS_SECRET must be at least 32 characters.",
    ),

  JWT_REFRESH_SECRET: z
    .string()
    .trim()
    .min(
      32,
      "JWT_REFRESH_SECRET must be at least 32 characters.",
    ),

  JWT_ACCESS_EXPIRES_IN: durationSchema,

  JWT_REFRESH_EXPIRES_IN: durationSchema,

  JWT_ISSUER: z.string().trim().min(1),

  JWT_AUDIENCE: z.string().trim().min(1),

  JWT_ALGORITHM: z.enum([
    "HS256",
  ]),

  COOKIE_SECURE: z.coerce.boolean(),

  COOKIE_DOMAIN: z.string(),

  COOKIE_SAME_SITE: z.enum([
    "strict",
    "lax",
    "none",
  ]),

  REFRESH_COOKIE_MAX_AGE: z.coerce
    .number()
    .int()
    .positive(),

  BCRYPT_SALT_ROUNDS: z.coerce
    .number()
    .int()
    .min(10)
    .max(15),

  PASSWORD_RESET_TOKEN_BYTES: z.coerce
    .number()
    .int()
    .min(16)
    .max(64),

  EMAIL_VERIFICATION_TOKEN_BYTES: z.coerce
    .number()
    .int()
    .min(16)
    .max(64),

  SESSION_ID_BYTES: z.coerce
    .number()
    .int()
    .min(16)
    .max(64),

  REFRESH_TOKEN_ID_BYTES: z.coerce
    .number()
    .int()
    .min(16)
    .max(64),
  
  SMTP_HOST: z.string(),

  SMTP_PORT: z.coerce.number(),

  SMTP_USER: z.string(),

  SMTP_PASSWORD: z.string(),

  SMTP_FROM: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("\n❌ Invalid environment variables\n");

  console.error(
    JSON.stringify(
      z.treeifyError(parsed.error),
      null,
      2,
    ),
  );

  process.exit(1);
}

export const env = Object.freeze(parsed.data);