import { z } from "zod";
import { createTRPCRouter } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { vetProcedure } from "../../procedures/vet-procedure";
import { isAfter, isBefore } from "date-fns";
import { $Enums } from "@prisma/client";

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
