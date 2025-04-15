import { VetScheduleSchema } from "@/server/modules/vet/vet-schedule/vet-schedule.schema";
import { vetProcedure } from "../../procedures/vet-procedure";
import { createTRPCRouter } from "../../trpc";
import { VetScheduleService } from "@/server/modules/vet/vet-schedule/vet-schedule.service";

export const vetScheduleRouter = createTRPCRouter({
  saveSchedule: vetProcedure
    .input(VetScheduleSchema.create)
    .mutation(async ({ input, ctx }) => {
      return await VetScheduleService.create(input, ctx.user.id);
    }),

  getSchedule: vetProcedure.query(async ({ ctx }) => {
    return await VetScheduleService.getByUserId(ctx.user.id);
  }),
});
