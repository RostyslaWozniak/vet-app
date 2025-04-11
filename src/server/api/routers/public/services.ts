import { db } from "@/server/db";
import { publicProcedure } from "../../procedures/public-procedure";
import { createTRPCRouter } from "../../trpc";
import { z } from "zod";

export const publicServicesRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          take: z.number().optional(),
          skip: z.number().optional(),
          search: z.string().optional(),
          orderBy: z
            .enum(["name", "updatedAt", "durationInMinutes"])
            .optional(),
          order: z.enum(["asc", "desc"]).optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const { take, skip, search, orderBy, order } = {
        take: 10,
        skip: 0,
        orderBy: "updatedAt",
        order: "asc",
        ...input,
      };

      return db.service.findMany({
        where: {
          isActive: true,
          ...(search
            ? {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
                description: {
                  contains: search,
                  mode: "insensitive",
                },
              }
            : {}),
        },
        orderBy: {
          [orderBy]: order,
        },
        select: {
          id: true,
          name: true,
          description: true,
          durationInMinutes: true,
        },
        take,
        skip,
      });
    }),
});
