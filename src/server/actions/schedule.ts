"use server";

import { getCurrentUser } from "@/auth/current-user";
import {
  scheduleFormSchema,
  type ScheduleFormSchema,
} from "@/lib/schema/schedule-schema";
import "use-server";
import { db } from "../db";

export async function saveSchedule(unsafeData: ScheduleFormSchema) {
  const user = await getCurrentUser();
  const { success, data } = scheduleFormSchema.safeParse(unsafeData);

  if (!success || user == null) {
    return { error: true };
  }

  const { availabilities, ...scheduleData } = data;

  console.log({ availabilities, scheduleData, user });
  let scheduleId = null;

  const existingSchedule = await db.schedule.findFirst({
    where: { userId: user.id },
  });
  console.log({ existingSchedule });

  if (!existingSchedule) {
    const newSchedule = await db.schedule.create({
      data: { ...scheduleData, userId: user.id },
    });
    scheduleId = newSchedule.id;
  } else {
    const updatedSchedule = await db.schedule.update({
      where: { id: existingSchedule.id },
      data: { ...scheduleData },
    });
    scheduleId = updatedSchedule.id;
  }

  if (availabilities.length > 0) {
    await db.scheduleAvailability.deleteMany({
      where: { scheduleId },
    });

    await db.scheduleAvailability.createMany({
      data: availabilities.map((availability) => ({
        ...availability,
        scheduleId,
      })),
    });
  }
}
