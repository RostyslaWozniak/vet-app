"use server";

import { db } from "@/server/db";
import {
  subscribeFormSchema,
  type SubscribeFormSchema,
} from "../lib/subscribe-form-schema";

export async function subscribeForNewsletter(
  data: SubscribeFormSchema,
): Promise<string | null> {
  const parsedData = subscribeFormSchema.parse(data);

  try {
    const subscriber = await db.newsletter.findUnique({
      where: {
        email: parsedData.email,
      },
    });
    if (subscriber) {
      return "Juz jestes zapisany na newsletter";
    }
    await db.newsletter.create({
      data: {
        email: parsedData.email,
        permitted: true,
      },
    });

    return null;
  } catch {
    return "Coś poszło nie tak. Spróbuj ponownie.";
  }
}
