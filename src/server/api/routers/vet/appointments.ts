import { z } from "zod";
import { createTRPCRouter } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { vetProcedure } from "../../procedures/vet-procedure";
import { format, isAfter, isBefore } from "date-fns";
import { $Enums } from "@prisma/client";
import { sendTextEmail } from "@/lib/services/resend";
import { pl } from "date-fns/locale";

import { format as timezoneFormat } from "date-fns-tz";
import { env } from "@/env";

export const vetAppointmentsRouter = createTRPCRouter({
  getAllOwn: vetProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        statuses: z
          .array(
            z.enum([
              $Enums.AppointmentStatus.CANCELLED,
              $Enums.AppointmentStatus.COMPLETED,
              $Enums.AppointmentStatus.PENDING,
              $Enums.AppointmentStatus.CONFIRMED,
            ]),
          )
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const appointments = await ctx.db.appointment.findMany({
        where: {
          vetSchedule: {
            userId: ctx.user.id,
          },
          startTime: {
            gte: input.startDate,
            lte: input.endDate,
          },
          ...(input.statuses && {
            status: {
              in: input.statuses,
            },
          }),
        },
        orderBy: {
          updatedAt: "asc",
        },
        select: {
          id: true,
          startTime: true,
          endTime: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phoneNumber: true,
              photo: true,
            },
          },
          contactName: true,
          contactEmail: true,
          contactPhone: true,
          status: true,
          createdAt: true,
          service: {
            select: {
              id: true,
              name: true,
              description: true,
              durationInMinutes: true,
            },
          },
        },
      });

      return appointments.filter((appointment, _, all) => {
        if (appointment.status !== "CANCELLED") {
          return true;
        }

        const { startTime: cancelledStart, endTime: cancelledEnd } =
          appointment;

        // Check if any NON-CANCELLED appointment overlaps this one
        const overlappingActive = all.some(
          (other) =>
            other.status !== "CANCELLED" &&
            // Start of other is before end of cancelled
            isBefore(other.startTime, cancelledEnd) &&
            // End of other is after start of cancelled
            isAfter(other.endTime, cancelledStart),
        );

        // Exclude this canceled appointment if there's overlap
        return !overlappingActive;
      });
    }),

  updateStatus: vetProcedure
    .input(
      z.object({
        appointmentId: z.string().uuid(),
        status: z.enum(["CONFIRMED", "COMPLETED"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const appointment = await ctx.db.appointment.findUnique({
        where: {
          id: input.appointmentId,
        },
        select: {
          contactEmail: true,
          startTime: true,
          service: {
            select: {
              name: true,
            },
          },
        },
      });
      if (!appointment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wizyta nie została znaleziona",
        });
      }
      if (appointment.contactEmail) {
        if (input.status === "CONFIRMED") {
          await sendTextEmail({
            email: appointment.contactEmail,
            subject: "Potwierdzenie wizyty",
            text: `Twoja wizyta została potwierdzona przez weterynarza. Zapraszamy ${format(appointment.startTime, "dd MMMM", { locale: pl })} o godzinie ${timezoneFormat(new Date(appointment.startTime).getTime() + (env.NODE_ENV === "development" ? 0 : 2 * 60 * 60 * 1000), "HH:mm", { locale: pl, timeZone: "Europe/Warsaw" })} na wizytę "${appointment.service.name}".`,
          });
        } else if (input.status === "COMPLETED") {
          await sendTextEmail({
            email: appointment.contactEmail,
            subject: "Zakonczenie wizyty",
            text: `Twoja wizyta "${appointment.service.name}" została zakonczona.`,
          });
        }
      }
      try {
        await ctx.db.appointment.update({
          where: {
            id: input.appointmentId,
          },
          data: {
            status: input.status,
          },
        });
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Nie udało się ${input.status === "COMPLETED" ? "zakończyć" : "potwierdzić"}  wizytę`,
        });
      }
    }),
});
