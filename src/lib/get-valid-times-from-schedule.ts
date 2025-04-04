import type { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";
import { db } from "@/server/db";

import {
  addMinutes,
  areIntervalsOverlapping,
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
  isWithinInterval,
  setHours,
  setMinutes,
} from "date-fns";
import { groupBy } from "./utils";
import type { $Enums } from "@prisma/client";
import { getCalendarEventTimes } from "@/server/google-calendar";

export async function getValidTimesFromSchedule(
  timesInOrder: Date[],
  event: { userId: string; durationInMinutes: number },
) {
  const start = timesInOrder[0];
  const end = timesInOrder.at(-1);

  if (start == null || end == null) return [];

  const schedule = await db.schedule.findFirst({
    where: { userId: event.userId },
    include: { availabilities: true },
  });

  if (schedule == null) return [];

  const groupedAvailabilities = groupBy(
    schedule.availabilities,
    (a) => a.dayOfWeek,
  );

  const eventTimes = await getCalendarEventTimes(event.userId, {
    start,
    end,
  });

  return timesInOrder.filter((intervalDate) => {
    const availabilities = getAvailabilities(
      groupedAvailabilities,
      intervalDate,
    );
    const eventInterval = {
      start: intervalDate,
      end: addMinutes(intervalDate, event.durationInMinutes),
    };

    return availabilities.some((availability) => {
      return (
        eventTimes.every((eventTime) => {
          return !areIntervalsOverlapping(eventTime, eventInterval);
        }) &&
        isWithinInterval(eventInterval.start, availability) &&
        isWithinInterval(eventInterval.end, availability)
      );
    });
  });
}

function getAvailabilities(
  groupedAvailabilities: Partial<
    Record<
      (typeof DAYS_OF_WEEK_IN_ORDER)[number],
      {
        id: string;
        scheduleId: string;
        startTime: string;
        endTime: string;
        dayOfWeek: $Enums.ScheduleDayOfWeek;
      }[]
    >
  >,
  date: Date,
) {
  let availabilities:
    | {
        id: string;
        scheduleId: string;
        startTime: string;
        endTime: string;
        dayOfWeek: $Enums.ScheduleDayOfWeek;
      }[]
    | undefined;

  if (isMonday(date)) {
    availabilities = groupedAvailabilities.MONDAY;
  }
  if (isTuesday(date)) {
    availabilities = groupedAvailabilities.TUESDAY;
  }
  if (isWednesday(date)) {
    availabilities = groupedAvailabilities.WEDNESDAY;
  }
  if (isThursday(date)) {
    availabilities = groupedAvailabilities.THURSDAY;
  }
  if (isFriday(date)) {
    availabilities = groupedAvailabilities.FRIDAY;
  }
  if (isSaturday(date)) {
    availabilities = groupedAvailabilities.SATURDAY;
  }
  if (isSunday(date)) {
    availabilities = groupedAvailabilities.SUNDAY;
  }

  if (availabilities == null) return [];

  return availabilities.map(({ startTime, endTime }) => {
    const start = setMinutes(
      setHours(date, parseInt(startTime.split(":")[0]!)),
      parseInt(startTime.split(":")[1]!),
    );

    const end = setMinutes(
      setHours(date, parseInt(endTime.split(":")[0]!)),
      parseInt(endTime.split(":")[1]!),
    );
    return { start, end };
  });
}
