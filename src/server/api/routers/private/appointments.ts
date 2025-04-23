import { z } from "zod";
import { privateProcedure } from "../../procedures/private-procedure";
import { createTRPCRouter } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { db } from "@/server/db";

const getInputObjectSchema = z
  .object({
    take: z.number().optional().default(9),
    skip: z.number().optional().default(0),
    order: z.enum(["asc", "desc"]).optional().default("desc"),
    orderBy: z.enum(["startTime", "updatedAt"]).optional().default("startTime"),
  })
  .optional()
  .default({
    take: 9,
    skip: 0,
    order: "desc",
    orderBy: "startTime",
  });

export const privateAppointmentsRouter = createTRPCRouter({
  getAll: privateProcedure
    .input(getInputObjectSchema)
    .query(async ({ ctx, input }) => {
      const where: Prisma.AppointmentWhereInput = {
        userId: ctx.user.id,
      };

      const appointmentsCount = await getAppointmentsCount(where);
      const appointments = await ctx.db.appointment.findMany({
        where,
        orderBy: {
          [input.orderBy]: input.order,
        },
        take: input.take,
        skip: input.skip,
        select: GET_APPOINTMENT_SELECT_FIELDS,
      });
      return {
        appointments,
        appointmentsCount,
      };
    }),
  getAllActive: privateProcedure
    .input(getInputObjectSchema)
    .query(async ({ ctx, input }) => {
      const now = new Date();
      const where: Prisma.AppointmentWhereInput = {
        userId: ctx.user.id,
        startTime: {
          gte: now,
        },
        status: {
          not: "CANCELLED",
        },
      };
      const appointmentsCount = await getAppointmentsCount(where);
      const appointments = await ctx.db.appointment.findMany({
        where,
        orderBy: {
          [input.orderBy]: input.order,
        },
        take: input.take,
        skip: input.skip,
        select: GET_APPOINTMENT_SELECT_FIELDS,
      });

      return {
        appointments,
        appointmentsCount,
      };
    }),

  getAllFinished: privateProcedure
    .input(getInputObjectSchema)
    .query(async ({ ctx, input }) => {
      const now = new Date();
      const where: Prisma.AppointmentWhereInput = {
        userId: ctx.user.id,
        startTime: {
          lt: now,
        },
        status: {
          equals: "COMPLETED",
        },
      };
      const appointmentsCount = await getAppointmentsCount(where);
      const appointments = await ctx.db.appointment.findMany({
        where,
        orderBy: {
          [input.orderBy]: input.order,
        },
        take: input.take,
        skip: input.skip,
        select: GET_APPOINTMENT_SELECT_FIELDS,
      });

      return {
        appointments,
        appointmentsCount,
      };
    }),
  getAllHistory: privateProcedure
    .input(getInputObjectSchema)
    .query(async ({ ctx, input }) => {
      const now = new Date();
      const where: Prisma.AppointmentWhereInput = {
        userId: ctx.user.id,
        startTime: {
          lt: now,
        },
      };
      const appointmentsCount = await getAppointmentsCount(where);
      const appointments = await ctx.db.appointment.findMany({
        where,
        orderBy: {
          [input.orderBy]: input.order,
        },
        take: input.take,
        skip: input.skip,
        select: GET_APPOINTMENT_SELECT_FIELDS,
      });

      return {
        appointments,
        appointmentsCount,
      };
    }),

  cancel: privateProcedure
    .input(
      z.object({
        appointmentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.appointment.update({
          where: {
            id: input.appointmentId,
            userId: ctx.user.id,
            status: {
              not: "CANCELLED",
            },
          },
          data: {
            status: "CANCELLED",
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

function getAppointmentsCount(where: Prisma.AppointmentWhereInput) {
  return db.appointment.count({
    where,
  });
}

const GET_APPOINTMENT_SELECT_FIELDS =
  Prisma.validator<Prisma.AppointmentSelect>()({
    id: true,
    status: true,
    startTime: true,
    endTime: true,
    service: {
      select: {
        id: true,
        name: true,
        description: true,
        durationInMinutes: true,
      },
    },
    vetSchedule: {
      select: {
        user: {
          select: {
            name: true,
          },
        },
      },
    },
  });
