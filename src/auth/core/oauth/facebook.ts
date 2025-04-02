import { env } from "@/env";
import { OAuthClient } from "./base";
import { z } from "zod";

export function createFacebookOAuthClient() {
  return new OAuthClient({
    provider: "facebook",
    clientId: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
    scopes: ["email", "public_profile"],
    urls: {
      auth: "https://www.facebook.com/v18.0/dialog/oauth",
      token: "https://graph.facebook.com/v18.0/oauth/access_token",
      user: "https://graph.facebook.com/v18.0/me?fields=id,name,email",
    },
    userInfo: {
      schema: z.object({
        id: z.string(), // Facebook user ID is a string
        name: z.string(),
        email: z.string().nullable(),
      }),
      parser: (user) => ({
        id: user.id,
        name: user.name,
        email: user.email ?? "",
      }),
    },
  });
}
