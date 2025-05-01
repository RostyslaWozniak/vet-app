"use server";

import { comparePasswords } from "@/auth/core/password-hasher";
import { createUserSession } from "@/auth/core/session";
import { signInSchema, type SignInSchema } from "../schemas/sign-in-schema";
import { db } from "@/server/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getOAuthClient } from "../core/oauth/base";
import type { OAuthProvider } from "../core/oauth/providers";
import type { FullUser } from "../current-user";

export async function signIn(unsafeData: SignInSchema): Promise<
  | {
      error: string;
      user: null;
      redirectUrl: null;
    }
  | {
      user: FullUser;
      redirectUrl: string;
      error: null;
    }
  | null
> {
  const { success, error, data } =
    await signInSchema.safeParseAsync(unsafeData);

  if (!success)
    return {
      error: error.issues[0]?.message ?? "Błąd walidacji",
      user: null,
      redirectUrl: null,
    };

  const user = await db.user.findUnique({ where: { email: data.email } });

  if (!user)
    return {
      error: "Nie udało się zalogować. Upewnij się, że dane są poprawne.",
      user: null,
      redirectUrl: null,
    };

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
    return null;
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword)
    return {
      error: "Nie udało się zalogować. Upewnij się, że dane są poprawne.",
      user: null,
      redirectUrl: null,
    };

  await createUserSession(user, await cookies());

  const afterLoginRedirectUrl = user.roles.includes("ADMIN")
    ? "/admin"
    : user.roles.includes("VET")
      ? "/vet"
      : "/profile";

  return {
    error: null,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      roles: user.roles,
      photo: user.photo,
    },
    redirectUrl: afterLoginRedirectUrl,
  };
}
