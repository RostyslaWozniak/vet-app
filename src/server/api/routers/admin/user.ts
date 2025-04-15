import { adminProcedure } from "../../procedures/admin-procedure";
import { createTRPCRouter } from "../../trpc";
import { z } from "zod";
import { $Enums } from "@prisma/client";
import { UserRepository } from "@/server/modules/user/user.repository";
const roles = Object.values($Enums.Roles) as [keyof typeof $Enums.Roles];

export const adminUserRouter = createTRPCRouter({
  getAllByRole: adminProcedure
    .input(z.object({ role: z.enum(roles) }))
    .query(async ({ input }) => {
      return await UserRepository.findAllByRole(input.role);
    }),
});
