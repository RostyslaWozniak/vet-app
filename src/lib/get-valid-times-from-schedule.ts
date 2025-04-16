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

export async function getValidTimesFromSchedule(
  timesInOrder: Date[],
  service: { id: string; durationInMinutes: number },
) {
  if (!timesInOrder.length) return [];

  const start = timesInOrder[0];
  const end = timesInOrder.at(-1);

  if (start == null || end == null) return [];

  const availabilities = await db.vetScheduleAvailability.findMany({
    where: {
      vetSchedule: {
        user: {
          vetProfile: {
            services: {
              some: {
                serviceId: service.id,
              },
            },
          },
        },
      },
    },
    select: {
      dayOfWeek: true,
      startTime: true,
      endTime: true,
    },
  });
  if (availabilities == null) return [];

  const groupedAvailabilities = groupBy(availabilities, (a) => a.dayOfWeek);

  const appointments = await db.appointment.findMany({
    where: {
      status: {
        not: "CANCELLED",
      },
    },
    select: {
      startTime: true,
      endTime: true,
    },
  });

  const appointmentTimes = appointments.map((a) => ({
    start: a.startTime,
    end: a.endTime,
  }));

  return timesInOrder.filter((intervalDate) => {
    const availabilities = getAvailabilities(
      groupedAvailabilities,
      intervalDate,
    );

    const eventInterval = {
      start: intervalDate,
      end: addMinutes(intervalDate, service.durationInMinutes),
    };

    return availabilities.some((availability) => {
      return (
        appointmentTimes.every((eventTime) => {
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
