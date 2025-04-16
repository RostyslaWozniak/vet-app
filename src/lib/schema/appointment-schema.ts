import { startOfDay } from "date-fns";
import { z } from "zod";
import { fromZonedTime } from "date-fns-tz";

const appointmentSchemaBase = z.object({
  startTime: z
    .date()
    .min(fromZonedTime(new Date(), "Europe/Warsaw"), "Required"),

  guestEmail: z.string().email().min(1, "Required"),
  guestName: z.string().min(1, "Required"),
  guestNotes: z.string().optional(),
});

export const appointmentFromSchema = z
  .object({
    date: z
      .date()
      .min(
        startOfDay(fromZonedTime(new Date(), "Europe/Warsaw")),
        "Must be in the future",
      ),
  })
  .merge(appointmentSchemaBase);

export const appointmentActionSchema = z
  .object({
    serviceId: z.string().min(1, "Required"),
  })
  .merge(appointmentFromSchema);

export type AppointmentFormSchema = z.infer<typeof appointmentFromSchema>;
export type AppointmentActionSchema = z.infer<typeof appointmentActionSchema>;
