"use server";

import { redirect } from "next/navigation";
import { getOAuthClient } from "../core/oauth/base";
import { cookies } from "next/headers";
import type { OAuthProvider } from "../core/oauth/providers";

export async function oAuthSignIn(provider: OAuthProvider) {
  const oAuthClient = getOAuthClient(provider);
  redirect(oAuthClient.createAuthUrl(await cookies()));
}
