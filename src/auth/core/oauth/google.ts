import { env } from "@/env";
import { OAuthClient } from "./base";
import { z } from "zod";

export function createGoogleOAuthClient() {
  return new OAuthClient({
    provider: "google",
    clientId: env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: env.GOOGLE_AUTH_CLIENT_SECRET,
    scopes: ["openid", "profile", "email"],
    urls: {
      auth: "https://accounts.google.com/o/oauth2/auth",
      token: "https://oauth2.googleapis.com/token",
      user: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    userInfo: {
      schema: z.object({
        sub: z.string(), // Google's unique user ID
        name: z.string().nullable(),
        email: z.string().nullable(),
        picture: z.string().nullable(),
      }),
      parser: (user) => ({
        id: user.sub, // Google uses "sub" for user ID
        name: user.name ?? "",
        email: user.email ?? "",
        photo: user.picture,
      }),
    },
  });
}
