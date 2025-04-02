import { getOAuthClient } from "@/auth/core/oauth/base";
import {
  oAuthProviders,
  type OAuthProvider,
} from "@/auth/core/oauth/providers";
import { createUserSession } from "@/auth/core/session";
import { db } from "@/server/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: OAuthProvider }> },
) {
  const { provider: rawProvider } = await params;

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const provider = z.enum(oAuthProviders).parse(rawProvider);

  if (typeof code !== "string" || typeof state !== "string") {
    redirect(
      `/sign-in?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`,
    );
  }
  const oAuthClient = getOAuthClient(provider);
  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state, await cookies());
    const user = await connectUserToAccount(oAuthUser, provider);
    await createUserSession(user, await cookies());
  } catch (error) {
    console.error(error);
    redirect(
      `/sign-in?oauthError=${encodeURIComponent(
        "Failed to connect. Please try again.",
      )}`,
    );
  }

  redirect("/");
}

function connectUserToAccount(
  {
    id,
    email,
    name,
    photo,
  }: { id: string; email: string; name: string; photo?: string },
  provider: OAuthProvider,
) {
  return db.$transaction(async (tx) => {
    let user = await tx.user.findUnique({ where: { email } });
    if (user == null) {
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          photo,
        },
      });
      user = newUser;
      await tx.userOAuthAccount.create({
        data: {
          provider,
          providerAccountId: id,
          userId: user.id,
        },
      });
    }

    return user;
  });
}
