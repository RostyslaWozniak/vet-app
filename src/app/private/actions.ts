"use server";

import { updateUserSessionData } from "@/auth/core/session";
import { getCurrentUser } from "@/auth/current-user";
import { db } from "@/server/db";
import { cookies } from "next/headers";

export async function toggleRole() {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  if (!user) return;

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: { role: user.role === "ADMIN" ? "USER" : "ADMIN" },
  });

  await updateUserSessionData(updatedUser, await cookies());
}
