import { petFormSchema } from "@/lib/schema/pet";
import { privateProcedure } from "../../procedures/private-procedure";
import { createTRPCRouter } from "../../trpc";
import { getDateFromAge } from "@/lib/formatters";
import { TRPCError } from "@trpc/server";

export const privatePetRouter = createTRPCRouter({
  create: privateProcedure
    .input(petFormSchema)
    .mutation(async ({ ctx, input }) => {
      const birthday = getDateFromAge(input.age);
      try {
        await ctx.db.pet.create({
          data: {
            name: input.name,
            species: input.species,
            birthday,
            breed: input.breed,
            userId: ctx.user.id,
          },
        });
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Coś poszło nie tak. Spróbuj ponownie.",
        });
      }
    }),
});
