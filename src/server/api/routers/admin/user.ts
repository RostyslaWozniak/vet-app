import { adminProcedure } from "../../procedures/admin-procedure";
import { createTRPCRouter } from "../../trpc";
import { z } from "zod";
import { $Enums } from "@prisma/client";
import { UserRepository } from "@/server/modules/user/user.repository";
import { TRPCError } from "@trpc/server";
const roles = Object.values($Enums.Roles) as [keyof typeof $Enums.Roles];

export const adminUserRouter = createTRPCRouter({
  getAllByRole: adminProcedure
    .input(z.object({ role: z.enum(roles) }))
    .query(async ({ input }) => {
      return await UserRepository.findAllByRole(input.role);
    }),

  chageRoles: adminProcedure
    .input(z.object({ userId: z.string(), roles: z.array(z.enum(roles)) }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.user.update({
          where: {
            id: input.userId,
          },
          data: {
            roles: input.roles,
          },
        });
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Coś poszło nie tak. Spróbój ponownie",
        });
      }
    }),
});
