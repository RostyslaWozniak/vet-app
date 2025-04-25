import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";
import { timeToInt } from "@/lib/utils";
import { z } from "zod";

export const scheduleFormSchema = z.object({
  availabilities: z
    .array(
      z.object({
        dayOfWeek: z.enum(DAYS_OF_WEEK_IN_ORDER),
        startTime: z
          .string()
          .regex(
            /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            "Czas musi być w formacie GG:MM",
          ),
        endTime: z
          .string()
          .regex(
            /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            "Czas musi być w formacie GG:MM",
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
            message: "Dostępność pokrywa się z inną",
            path: [index],
          });
        }

        if (
          timeToInt(availability.startTime) >= timeToInt(availability.endTime)
        ) {
          ctx.addIssue({
            code: "custom",
            message:
              "Czas zakończenia musi być późniejszy niż czas rozpoczęcia",
            path: [index],
          });
        }
      });
    }),
});

export type ScheduleFormSchema = z.infer<typeof scheduleFormSchema>;
