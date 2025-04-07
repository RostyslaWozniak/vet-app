import { db } from "@/server/db";

export class VetScheduleRepository {
  public static async findByUserId(userId: string) {
    return await db.vetSchedule.findUnique({
      where: {
        userId,
      },
      include: {
        availabilities: true,
      },
    });
  }

  public static async create({ userId }: { userId: string }) {
    return await db.vetSchedule.create({
      data: {
        userId,
      },
    });
  }
}
