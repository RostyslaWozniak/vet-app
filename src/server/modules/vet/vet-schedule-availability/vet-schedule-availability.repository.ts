import { db } from "@/server/db";
import type { VetScheduleAvailabilityCreateType } from "./vet-schedule-availability.types";

export class VetScheduleAvailabilityRepository {
  public static async createMany(data: VetScheduleAvailabilityCreateType) {
    await db.vetScheduleAvailability.createMany({
      data: data.availabilities.map((availability) => ({
        ...availability,
        vetScheduleId: data.vetScheduleId,
      })),
    });
  }

  public static async deleteMany(vetScheduleId: string) {
    return await db.vetScheduleAvailability.deleteMany({
      where: { vetScheduleId },
    });
  }
}
