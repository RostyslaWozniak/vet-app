import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";
import { timeToInt } from "@/lib/utils";
import { z } from "zod";

export class VetScheduleAvailabilitySchema {
  public static awailabilities = z
    .array(
      z.object({
        dayOfWeek: z.enum(DAYS_OF_WEEK_IN_ORDER),
        startTime: z
          .string()
          .regex(
            /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            "Czas musi być w formacie HH:MM",
          ),
        endTime: z
          .string()
          .regex(
            /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            "Czas musi być w formacie HH:MM",
          ),
      }),
    )
    .superRefine((availabilities, ctx) => {
      availabilities.forEach((availability, index) => {
        const overlaps = availabilities.some((a, i) => {
          return (
            i !== index &&
            a.dayOfWeek === availability.dayOfWeek &&
            timeToInt(a.startTime) < timeToInt(availability.endTime) &&
            timeToInt(a.endTime) > timeToInt(availability.startTime)
          );
        });

        if (overlaps) {
          ctx.addIssue({
            code: "custom",
            message: "Dostepnosc na ten dzien i czas juz istnieje",
            path: [index],
          });
        }

        if (
          timeToInt(availability.startTime) >= timeToInt(availability.endTime)
        ) {
          ctx.addIssue({
            code: "custom",
            message: "Czas zakonczenia musi byc po czasem rozpoczecia",
            path: [index],
          });
        }
      });
    });
  public static create = z.object({
    vetScheduleId: z.string().min(1),
    availabilities: this.awailabilities,
  });
}
