// import { startOfDay } from "date-fns";
import { z } from "zod";
// import { fromZonedTime } from "date-fns-tz";

const appointmentSchemaBase = z.object({
  startTime: z.date({ message: "Wybierz czas" }),
  guestEmail: z.string().min(1, "Jest wymagane").email("Nie poprawny email"),
  guestName: z.string().min(1, "Jest wymagane"),
  guestNotes: z.string().optional(),
});

export const appointmentFromSchema = z
  .object({
    date: z.date({ message: "Wybierz datę" }),
  })
  .merge(appointmentSchemaBase);

export const appointmentActionSchema = z
  .object({
    serviceId: z.string().min(1, "Required"),
  })
  .merge(appointmentFromSchema);

export type AppointmentFormSchema = z.infer<typeof appointmentFromSchema>;
export type AppointmentActionSchema = z.infer<typeof appointmentActionSchema>;
