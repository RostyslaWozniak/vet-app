import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BASE_URL: z.string().url().default("http://localhost:3000"),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.string().url(),

    // UPSTASH
    REDIS_URL: z.string().url(),
    REDIS_TOKEN: z.string().min(1),

    // OAUTH
    OAUTH_REDIRECT_URL: z.string().url(),
    GOOGLE_AUTH_CLIENT_ID: z.string().min(1),
    GOOGLE_AUTH_CLIENT_SECRET: z.string().min(1),

    // UPLOADTHINGS
    UPLOADTHING_TOKEN: z.string().min(1),
    UPLOADTHINGS_URL: z.string().url(),

    // resend
    RESEND_API_KEY: z.string().min(1),
    RESEND_DOMAIN: z.string().min(1),
    RESEND_FROM_NAME: z.string().min(1),
  },

  client: {},

  runtimeEnv: {
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    // UPSTASH
    REDIS_URL: process.env.REDIS_URL,
    REDIS_TOKEN: process.env.REDIS_TOKEN,
    // OAUTH
    OAUTH_REDIRECT_URL: process.env.OAUTH_REDIRECT_URL,

    GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
    GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,

    // UPLOADTHINGS
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    UPLOADTHINGS_URL: process.env.UPLOADTHINGS_URL,

    // resend
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_DOMAIN: process.env.RESEND_DOMAIN,
    RESEND_FROM_NAME: process.env.RESEND_FROM_NAME,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
