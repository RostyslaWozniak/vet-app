"use server";

import { getCurrentUser } from "@/auth/current-user";
import { db } from "../db";

export async function createAppointment() {
  const user = await getCurrentUser();
}
