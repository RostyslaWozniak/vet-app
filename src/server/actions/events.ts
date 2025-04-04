"use server";

import { getCurrentUser } from "@/auth/current-user";
import {
  eventFormSchema,
  type EventFormSchema,
} from "@/lib/schema/events-schema";
import { redirect } from "next/navigation";
import "use-server";
import { db } from "../db";

export async function createEvent(
  unsafeData: EventFormSchema,
): Promise<{ error: boolean } | undefined> {
  const user = await getCurrentUser();
  const { success, data } = eventFormSchema.safeParse(unsafeData);

  if (!success || user == null) {
    return { error: true };
  }

  await db.event.create({ data: { ...data, userId: user.id } });

  redirect("/events");
}

export async function updateEvent(
  id: string,
  unsafeData: EventFormSchema,
): Promise<{ error: boolean } | undefined> {
  const user = await getCurrentUser();
  const { success, data } = eventFormSchema.safeParse(unsafeData);

  if (!success || user == null) {
    return { error: true };
  }

  await db.event.update({
    where: { id },
    data: { ...data, userId: user.id },
  });

  redirect("/events");
}

export async function deleteEvent(
  id: string,
): Promise<{ error: boolean } | undefined> {
  const user = await getCurrentUser();

  if (user == null) {
    return { error: true };
  }

  await db.event.delete({
    where: { id },
  });

  redirect("/events");
}
