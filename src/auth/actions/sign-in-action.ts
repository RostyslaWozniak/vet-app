"use server";

import { comparePasswords } from "@/auth/core/password-hasher";
import { createUserSession } from "@/auth/core/session";
import { signInSchema } from "../schemas/sign-in-schema";
import { db } from "@/server/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getOAuthClient } from "../core/oauth/base";
import type { OAuthProvider } from "../core/oauth/providers";

export async function signIn(unsafeData: unknown) {
  const { success, error, data } =
    await signInSchema.safeParseAsync(unsafeData);

  if (!success) return error.issues[0]?.message ?? "Validation error";

  const user = await db.user.findUnique({ where: { email: data.email } });

  if (!user) return "User not found";

  if (!user.password || !user.salt) {
    const oAuthUser = await db.userOAuthAccount.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (oAuthUser) {
      const oAuthClient = getOAuthClient(oAuthUser.provider as OAuthProvider);
      redirect(oAuthClient.createAuthUrl(await cookies()));
    }
    return "User not found";
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "Incorrect password";

  await createUserSession(user, await cookies());

  const afterLoginRedirectUrl = user.roles.includes("ADMIN")
    ? "/admin"
    : user.roles.includes("VET")
      ? "/vet"
      : "/profile";

  redirect(afterLoginRedirectUrl);
}
