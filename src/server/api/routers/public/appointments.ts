import { z } from "zod";
import { publicProcedure } from "../../procedures/public-procedure";
import { createTRPCRouter } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";
import type { $Enums } from "@prisma/client";
import { getCurrentUser } from "@/auth/current-user";
import { env } from "@/env";

export const publicAppointmentsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        startTime: z.string(),
        guestEmail: z.string().email().min(1, "Required"),
        guestName: z.string().min(1, "Required"),
        guestNotes: z.string().optional(),
        serviceId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const startDate = new Date(input.startTime);
      const startTime = startDate.getTime();

      if (startTime < Date.now()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Wizyta nie moze byc wczesniejsza niz dzisiaj",
        });
      }

      const service = await ctx.db.service.findUnique({
        where: {
          id: input.serviceId,
        },
      });
      if (!service)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Usługa nie istnieje",
        });

      const endDate = new Date(startTime + service.durationInMinutes * 60000); // Appointment's end time

      const availabilities = await ctx.db.vetScheduleAvailability.findMany({
        where: {
          vetSchedule: {
            user: {
              vetProfile: {
                services: {
                  some: {
                    serviceId: input.serviceId,
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
          vetScheduleId: true,
        },
      });

      const { isAvailable, vetScheduleIds } = checkIfIsDateAvailable(
        startDate,
        endDate,
        availabilities,
      );

      if (!isAvailable) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Brak dostepnych terminow",
        });
      }

      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          await ctx.db.appointment.create({
            data: {
              contactName: input.guestName,
              contactEmail: input.guestEmail,
              vetScheduleId: vetScheduleIds[0]!,
              serviceId: input.serviceId,
              startTime: startDate,
              endTime: endDate,
            },
          });
        } else {
          await ctx.db.appointment.create({
            data: {
              userId: currentUser.id,
              contactName: input.guestName,
              contactEmail: input.guestEmail,
              vetScheduleId: vetScheduleIds[0]!,
              serviceId: input.serviceId,
              startTime: startDate,
              endTime: endDate,
            },
          });
        }
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Coś poszło nie tak. Spróbój ponownie",
        });
      }
    }),
});

function checkIfIsDateAvailable(
  startDate: Date,
  endDate: Date,
  availabilities: {
    vetScheduleId: string;
    startTime: string;
    endTime: string;
    dayOfWeek: $Enums.ScheduleDayOfWeek;
  }[],
) {
  // Get the day of the week for startDate (0 = Sunday, 1 = Monday, etc.)
  const appointmentDayOfWeek = startDate.getDay();

  const deployedHoursDelay = env.NODE_ENV === "production" ? 2 : 0;
  // Convert startTime and endTime of appointment into minutes since midnight
  const startMinutes =
    (startDate.getHours() + deployedHoursDelay) * 60 + startDate.getMinutes();
  const endMinutes =
    (endDate.getHours() + deployedHoursDelay) * 60 + endDate.getMinutes();
  const vetScheduleIds: string[] = [];

  const isAvailable = availabilities.some((availability) => {
    // Match the day of the week

    if (
      availability.dayOfWeek !== DAYS_OF_WEEK_IN_ORDER[appointmentDayOfWeek - 1]
    ) {
      return false;
    }

    // Convert the availability startTime and endTime to minutes since midnight
    const availabilityStart = convertTimeToMinutes(availability.startTime);
    const availabilityEnd = convertTimeToMinutes(availability.endTime);

    // Check if the appointment times overlap with the availability
    if (startMinutes >= availabilityStart && endMinutes <= availabilityEnd) {
      if (!vetScheduleIds.includes(availability.vetScheduleId)) {
        vetScheduleIds.push(availability.vetScheduleId);
      }
      return true;
    }
    return false;
  });

  return { isAvailable, vetScheduleIds };
}

// Helper function to convert time strings (e.g., "11:00") to minutes since midnight
function convertTimeToMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);
  if (hours == undefined || minutes == undefined) {
    throw new Error("Invalid time format");
  }
  return hours * 60 + minutes;
}
