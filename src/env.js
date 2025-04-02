import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.string().url(),

    // UPSTASH
    REDIS_URL: z.string().url(),
    REDIS_TOKEN: z.string().min(1),

    // OAUTH
    OAUTH_REDIRECT_URL: z.string().url(),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    FACEBOOK_CLIENT_ID: z.string().min(1),
    FACEBOOK_CLIENT_SECRET: z.string().min(1),
  },

  client: {},

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    // UPSTASH
    REDIS_URL: process.env.REDIS_URL,
    REDIS_TOKEN: process.env.REDIS_TOKEN,
    // OAUTH
    OAUTH_REDIRECT_URL: process.env.OAUTH_REDIRECT_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
