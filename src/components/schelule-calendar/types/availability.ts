import type { $Enums } from "@prisma/client";

export type AvailabilityType = {
  startTime: string;
  endTime: string;
  dayOfWeek: $Enums.ScheduleDayOfWeek;
};
