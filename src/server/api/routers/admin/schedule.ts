import { z } from "zod";
import { adminProcedure } from "../../procedures/admin-procedure";
import { createTRPCRouter } from "../../trpc";
import { AdminScheduleService } from "@/server/modules/admin/admin-schedule/admin-schedule.service";

export const adminScheduleRouter = createTRPCRouter({
  getByUserId: adminProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await AdminScheduleService.getByUserId(input.userId);
    }),
});
