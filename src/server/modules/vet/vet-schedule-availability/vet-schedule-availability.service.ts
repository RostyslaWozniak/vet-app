import type { VetScheduleAvailabilityCreateType } from "./vet-schedule-availability.types";
import { VetScheduleAvailabilityRepository } from "./vet-schedule-availability.repository";

export class VetScheduleAvailabilityService {
  public static async createMany(data: VetScheduleAvailabilityCreateType) {
    return await VetScheduleAvailabilityRepository.createMany(data);
  }
  public static async deleteMany(vetScheduleId: string) {
    return await VetScheduleAvailabilityRepository.deleteMany(vetScheduleId);
  }
}
