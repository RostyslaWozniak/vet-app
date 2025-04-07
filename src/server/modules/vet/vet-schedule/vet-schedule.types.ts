import type { z } from "zod";
import type { VetScheduleSchema } from "./vet-schedule.schema";

export type ScheduleFormSchemaType = z.infer<typeof VetScheduleSchema.create>;
