import { z } from "zod";

export const contactFormSchema = z.object({
  username: z
    .string()
    .min(1, "Imię jest wymagane")
    .max(30, "Maksymalnie 30 znaków"),
  email: z
    .string()
    .email("Nie poprawny email")
    .min(1, "Email jest wymagany")
    .max(50, "Maksymalnie 50 znaków"),
  message: z
    .string()
    .min(1, "Wiadomość jest wymagana")
    .max(1000, "Maksymalnie 1000 znaków"),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
