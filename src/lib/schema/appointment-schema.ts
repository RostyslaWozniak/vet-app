import { startOfDay } from "date-fns";
import { z } from "zod";

const appointmentSchemaBase = z.object({
  startTime: z.date().min(new Date()),
  guestEmail: z.string().email().min(1, "Required"),
  guestName: z.string().min(1, "Required"),
  guestNotes: z.string().optional(),
});

export const appointmentFromSchema = z
  .object({
    date: z.date().min(startOfDay(new Date()), "Must be in the future"),
  })
  .merge(appointmentSchemaBase);

export const appointmentActionSchema = z
  .object({
    serviceId: z.string().min(1, "Required"),
  })
  .merge(appointmentFromSchema);

export type AppointmentFormSchema = z.infer<typeof appointmentFromSchema>;
export type AppointmentActionSchema = z.infer<typeof appointmentActionSchema>;
