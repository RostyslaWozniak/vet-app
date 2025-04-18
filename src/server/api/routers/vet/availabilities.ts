import { createTRPCRouter } from "../../trpc";
import { vetProcedure } from "../../procedures/vet-procedure";

export const vetAvailabilitiesRouter = createTRPCRouter({
  getAllOwn: vetProcedure.query(async ({ ctx }) => {
    const vetSchedule = await ctx.db.vetSchedule.findUnique({
      where: {
        userId: ctx.user.id,
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
