import { VetServicesService } from "@/server/modules/vet/vet-services/vet-services.service";
import { vetProcedure } from "../../procedures/vet-procedure";
import { createTRPCRouter } from "../../trpc";
import { VetServicesSchema } from "@/server/modules/vet/vet-services/vet-services.schema";

export const vetServiceRouter = createTRPCRouter({
  getAll: vetProcedure.query(async () => {
    return await VetServicesService.getAll();
  }),
  getAllOwn: vetProcedure.query(async ({ ctx }) => {
    return await VetServicesService.getAllOwn(ctx.user.id);
  }),

  mutateList: vetProcedure
    .input(VetServicesSchema.mutateList)
    .mutation(async ({ input, ctx }) => {
      return await VetServicesService.mutateList({
        ...input,
        userId: ctx.user.id,
      });
    }),
});
