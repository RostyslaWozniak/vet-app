import { z } from "zod";
import { adminProcedure } from "../../procedures/admin-procedure";
import { createTRPCRouter } from "../../trpc";
import { groupBy } from "@/lib/utils";
import { TRPCError } from "@trpc/server";

export const adminAppointmentsRouter = createTRPCRouter({
  getAllByUserId: adminProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const appointments = await ctx.db.appointment.findMany({
        where: {
          vetSchedule: {
            userId: input.userId,
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

      //   group by date
      const appointmentsByDate = groupBy(appointments, (a) =>
        a.startTime.toISOString(),
      );

      // check if the date is repeating (since some meetings can be CANCELLED and may have the same date)
      // and return only the last meetings if there are more than 1
      return Object.entries(appointmentsByDate)
        .map(([_key, value]) => {
          return value.at(-1);
        })
        .filter((app) => app !== undefined);
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
