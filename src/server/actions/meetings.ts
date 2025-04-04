"use server";

import "use-server";
import { redirect } from "next/navigation";
import { meetingActionSchema } from "@/lib/schema/meetings-schema";
import { db } from "../db";
import { getValidTimesFromSchedule } from "@/lib/get-valid-times-from-schedule";
import { createCalendarEvent } from "../google-calendar";

export async function createMeeting(unsafeData: unknown) {
  const { success, data } = meetingActionSchema.safeParse(unsafeData);

  if (!success) return { error: true };
  const event = await db.event.findFirst({
    where: {
      id: data.eventId,
      isActive: true,
      userId: data.userId,
    },
  });

  if (event == null) return { error: true };
  const startInTimezone = data.startTime;

  const validTimes = await getValidTimesFromSchedule([startInTimezone], event);
  if (validTimes.length === 0) return { error: true };

  await createCalendarEvent({
    ...data,
    startTime: startInTimezone,
    durationInMinutes: event.durationInMinutes,
    eventName: event.name,
  });

  redirect(
    `/book/${data.userId}/${
      data.eventId
    }/success?startTime=${data.startTime.toISOString()}`,
  );
}
