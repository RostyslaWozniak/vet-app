"use server";

import { generateSalt, hashPassword } from "@/auth/core/password-hasher";
import { createUserSession } from "@/auth/core/session";
import { signUpSchema, type SignUpSchema } from "../schemas/sign-up-schema";
import { db } from "@/server/db";
import { cookies } from "next/headers";
import type { FullUser } from "../current-user";

export async function signUp(unsafeData: SignUpSchema): Promise<
  | {
      error: string;
      user: null;
    }
  | {
      user: FullUser;
      error: null;
    }
> {
  const validData = signUpSchema.safeParse(unsafeData);
  if (!validData.success) {
    return {
      error: validData.error.issues[0]?.message ?? "Validation error",
      user: null,
    };
  }

  const { name, email, password } = validData.data;

  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    return {
      error: "Konto z tym adresem e-mail jest już zarejestrowane",
      user: null,
    };
  }

  const salt = generateSalt();
  const hashedPassword = await hashPassword(password, salt);

  try {
    const user = await db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          salt,
        },
      });

      await tx.appointment.updateMany({
        where: {
          contactEmail: email,
        },
        data: {
          userId: user.id,
        },
      });

      return user;
    });

    await createUserSession(user, await cookies());
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
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Nie udało się stworzyć konta. Spróbuj ponownie",
      user: null,
    };
  }
}
