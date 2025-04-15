import { Prisma } from "@prisma/client";

export class AdminScheduleQueries {
  public static availabilitiesSelect =
    Prisma.validator<Prisma.VetScheduleSelect>()({
      availabilities: {
        select: {
          startTime: true,
          endTime: true,
        },
      },
    });

  public static appointmentsWithServiceSelect =
    Prisma.validator<Prisma.VetScheduleSelect>()({
      appointments: {
        include: {
          service: true,
        },
      },
    });
}
