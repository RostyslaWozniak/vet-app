import { z } from "zod";
import { adminProcedure } from "../../procedures/admin-procedure";
import { createTRPCRouter } from "../../trpc";
import { isBefore, isAfter } from "date-fns";
import { TRPCError } from "@trpc/server";

export const adminAppointmentsRouter = createTRPCRouter({
  getAllByUserId: adminProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const appointments = await ctx.db.appointment.findMany({
        where: {
          vetSchedule: {
            userId: input.userId,
          },
          startTime: {
            gte: input.startDate,
            lte: input.endDate,
          },
        },
        orderBy: {
          updatedAt: "asc",
        },
        select: {
          id: true,
          startTime: true,
          endTime: true,
          userId: true,
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

  cancel: adminProcedure
    .input(z.object({ appointmentId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.appointment.update({
          where: {
            id: input.appointmentId,
          },
          data: {
            status: "CANCELLED",
          },
        });
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Nie udało się anulować wizyty",
        });
      }
    }),
});
