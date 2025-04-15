"use server";

import { generateSalt, hashPassword } from "@/auth/core/password-hasher";
import { createUserSession } from "@/auth/core/session";
import { signUpSchema } from "../schemas/sign-up-schema";
import { db } from "@/server/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signUp(unsafeData: unknown) {
  const validData = signUpSchema.safeParse(unsafeData);
  if (!validData.success) {
    return validData.error.issues[0]?.message ?? "Validation error";
  }

  const { name, email, password } = validData.data;

  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    return "User already exists";
  }

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        salt,
      },
    });
    if (!user) {
      return "Failed to create user";
    }

    await createUserSession(user, await cookies());
  } catch (err) {
    console.log(err);
    return "Failed to create user";
  }
  revalidatePath("/me");

  redirect("/me");
}
