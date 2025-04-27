import { privateProcedure } from "../../procedures/private-procedure";
import { createTRPCRouter } from "../../trpc";
import { updateUserProfile } from "@/lib/schema/user";
import { TRPCError } from "@trpc/server";

export const privateUserRouter = createTRPCRouter({
  updateProfile: privateProcedure
    .input(
      updateUserProfile.catch(({ error }) => {
        const message =
          error.issues.map((issue) => issue.message)[0] ?? "Bład walidacji";

        throw new TRPCError({
          code: "BAD_REQUEST",
          message,
        });
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.user.update({
          where: {
            id: ctx.user.id,
          },
          data: input,
        });
      } catch (err) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Cos poszlo nie tak. Sprobuj ponownie",
        });
      }
    }),
});
