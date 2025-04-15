import { privateProcedure } from "../../procedures/private-procedure";
import { createTRPCRouter } from "../../trpc";

export const publicUserRouter = createTRPCRouter({
  getUser: privateProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: {
        id: ctx.user.id,
      },
    });
  }),
});
