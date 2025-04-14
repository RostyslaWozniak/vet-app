"use server";

import { cookies } from "next/headers";
import { removeUserFromSession } from "../core/session";
import { redirect } from "next/navigation";

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/sign-in");
}
