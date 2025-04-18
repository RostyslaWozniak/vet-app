import { db } from "@/server/db";

export class AdminScheduleRepository {
  public static async findByVetId(vetId: string) {
    return await db.vetSchedule.findUnique({
      where: {
        userId: vetId,
      },
      select: {
        appointments: {
          include: {
            service: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
        availabilities: {
          select: {
            startTime: true,
            endTime: true,
            dayOfWeek: true,
          },
        },
      },
    });
  }
}
