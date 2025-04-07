import { z } from "zod";
import { VetScheduleAvailabilitySchema } from "../vet-schedule-availability/vet-schedule-availability.schema";

export class VetScheduleSchema {
  public static create = z.object({
    availabilities: VetScheduleAvailabilitySchema.awailabilities,
  });
}
