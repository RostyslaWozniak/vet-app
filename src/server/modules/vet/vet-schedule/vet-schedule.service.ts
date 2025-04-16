import { TRPCError } from "@trpc/server";
import { VetScheduleSchema } from "./vet-schedule.schema";
import { VetScheduleRepository } from "./vet-schedule.repositories";
import { VetScheduleAvailabilityService } from "../vet-schedule-availability/vet-schedule-availability.service";

export class VetScheduleService {
  public static async create(unsafeData: unknown, userId: string) {
    const { data, success } = VetScheduleSchema.create.safeParse(unsafeData);
    if (!success)
      throw new TRPCError({ code: "BAD_REQUEST", message: "Bład walidacji" });

    const existingSchedule = await VetScheduleRepository.findByUserId(userId);

    let vetScheduleId: string | null = null;

    if (!existingSchedule) {
      const newSchedule = await VetScheduleRepository.create({
        userId,
      });
      vetScheduleId = newSchedule.id;
      if (data.availabilities.length > 0) {
        await VetScheduleAvailabilityService.createMany({
          availabilities: data.availabilities,
          vetScheduleId,
        });
      }
    } else {
      vetScheduleId = existingSchedule.id;
      if (data.availabilities.length > 0) {
        await VetScheduleAvailabilityService.deleteMany(vetScheduleId);

        await VetScheduleAvailabilityService.createMany({
          availabilities: data.availabilities,
          vetScheduleId,
        });
      }
    }
  }

  public static async getByUserId(userId: string) {
    return await VetScheduleRepository.findByUserId(userId);
  }
}
