import { z } from "zod";
import { adminProcedure } from "../../procedures/admin-procedure";
import { createTRPCRouter } from "../../trpc";

export const adminAvailabilitiesRouter = createTRPCRouter({
  getAllByUserId: adminProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const vetSchedule = await ctx.db.vetSchedule.findUnique({
        where: {
          userId: input.userId,
        },
      });

      if (!vetSchedule) {
        return [];
      }

      const availabilities = await ctx.db.vetScheduleAvailability.findMany({
        where: {
          vetScheduleId: vetSchedule.id,
        },
        select: {
          startTime: true,
          endTime: true,
          dayOfWeek: true,
        },
      });

      return availabilities;
    }),
});
