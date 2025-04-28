import { petFormSchema } from "@/lib/schema/pet";
import { privateProcedure } from "../../procedures/private-procedure";
import { createTRPCRouter } from "../../trpc";
import { getDateFromAge } from "@/lib/formatters";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { tryCatch } from "@/lib/try-catch";
import { Prisma } from "@prisma/client";

export const privatePetRouter = createTRPCRouter({
  getAllOwn: privateProcedure.query(async ({ ctx }) => {
    return await ctx.db.pet.findMany({
      where: {
        userId: ctx.user.id,
      },
      select: SELECT_PET_FIELDS,
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  getOwnOneById: privateProcedure
    .input(z.object({ petId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await tryCatch(
        ctx.db.pet.findUnique({
          where: {
            id: input.petId,
            userId: ctx.user.id,
          },
          select: SELECT_PET_FIELDS,
        }),
      );
      if (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Coś poszło nie tak.",
        });
      }
      return data;
    }),

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

  update: privateProcedure
    .input(petFormSchema.extend({ petId: z.string().uuid().optional() }))
    .mutation(async ({ ctx, input }) => {
      const birthday = getDateFromAge(input.age);
      const { data, error } = await tryCatch(
        ctx.db.pet.update({
          where: {
            id: input.petId,
            userId: ctx.user.id,
          },
          data: {
            name: input.name,
            species: input.species,
            birthday,
            breed: input.breed,
            userId: ctx.user.id,
          },
          select: SELECT_PET_FIELDS,
        }),
      );

      if (error || data == null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Coś poszło nie tak. Spróbuj ponownie.",
        });
      }
      return data;
    }),

  remove: privateProcedure
    .input(z.object({ petId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await tryCatch(
        ctx.db.pet.delete({
          where: {
            id: input.petId,
            userId: ctx.user.id,
          },
        }),
      );

      if (error || data == null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Coś poszło nie tak. Spróbuj ponownie.",
        });
      }
    }),
});

const SELECT_PET_FIELDS = Prisma.validator<Prisma.PetSelect>()({
  id: true,
  name: true,
  species: true,
  birthday: true,
  breed: true,
  photo: true,
});
