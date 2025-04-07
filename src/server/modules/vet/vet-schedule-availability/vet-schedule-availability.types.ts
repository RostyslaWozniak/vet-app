import type { z } from "zod";
import type { VetScheduleAvailabilitySchema } from "./vet-schedule-availability.schema";

export type VetScheduleAvailabilityCreateType = z.infer<
  typeof VetScheduleAvailabilitySchema.create
>;
