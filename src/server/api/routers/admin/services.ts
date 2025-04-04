import { AdminServicesService } from "@/server/modules/admin/admin-services/admin-services.service";
import { createTRPCRouter } from "../../trpc";
import { adminProcedure } from "../../procedures/admin-procedure";
import { AdminServicesSchema } from "@/server/modules/admin/admin-services/admin-services.schema";

export const adminServicesRouter = createTRPCRouter({
  getAll: adminProcedure.query(async () => {
    return await AdminServicesService.getAll();
  }),

  getById: adminProcedure
    .input(AdminServicesSchema.getById)
    .query(async ({ input }) => {
      return await AdminServicesService.getById(input.id);
    }),

  create: adminProcedure
    .input(AdminServicesSchema.create)
    .mutation(async ({ input }) => {
      return await AdminServicesService.create(input);
    }),

  update: adminProcedure
    .input(AdminServicesSchema.update)
    .mutation(async ({ input }) => {
      return await AdminServicesService.update(input);
    }),

  delete: adminProcedure
    .input(AdminServicesSchema.delete)
    .mutation(async ({ input }) => {
      return await AdminServicesService.delete(input);
    }),
});
