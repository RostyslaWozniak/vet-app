import { db } from "@/server/db";

export class AdminVetScheduleRepository {
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
        },
        availabilities: {
          select: {
            startTime: true,
            endTime: true,
          },
        },
      },
    });
  }
}
