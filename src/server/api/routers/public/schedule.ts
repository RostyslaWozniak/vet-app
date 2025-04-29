import { z } from "zod";
import { publicProcedure } from "../../procedures/public-procedure";
import { createTRPCRouter } from "../../trpc";
import { groupBy } from "@/lib/utils";
import {
  addMinutes,
  areIntervalsOverlapping,
  eachMinuteOfInterval,
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
import type { $Enums } from "@prisma/client";
import { fromZonedTime } from "date-fns-tz";
import type { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";
import { TRPCError } from "@trpc/server";
import { TIME_ZONE_CONFIG } from "@/lib/configs/time-zone-config";

export const publicScheduleRouter = createTRPCRouter({
  getValidTimesFromSchedule: publicProcedure
    .input(
      z.object({
        nearestValidDate: z.date(),
        endDate: z.date(),
        service: z.object({ id: z.string(), durationInMinutes: z.number() }),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { nearestValidDate, endDate, service } = input;

      const timesInOrder = eachMinuteOfInterval(
        { start: nearestValidDate, end: endDate },
        { step: 15 },
      );

      if (!timesInOrder.length) return [];

      const start = timesInOrder[0];
      const end = timesInOrder.at(-1);

      if (start == null || end == null) return [];

      const availabilities = await ctx.db.vetScheduleAvailability.findMany({
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
      if (availabilities.length === 0)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Brak dostępnych terminów",
        });

      const groupedAvailabilities = groupBy(availabilities, (a) => a.dayOfWeek);

      const appointments = await ctx.db.appointment.findMany({
        where: {
          status: {
            not: "CANCELLED",
          },
          startTime: {
            gte: start,
            lte: end,
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
    }),
});

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
    const start = fromZonedTime(
      setMinutes(
        setHours(date, parseInt(startTime.split(":")[0]!)),
        parseInt(startTime.split(":")[1]!),
      ),
      TIME_ZONE_CONFIG.location,
    );

    const end = fromZonedTime(
      setMinutes(
        setHours(date, parseInt(endTime.split(":")[0]!)),
        parseInt(endTime.split(":")[1]!),
      ),
      TIME_ZONE_CONFIG.location,
    );
    return { start, end };
  });
}
