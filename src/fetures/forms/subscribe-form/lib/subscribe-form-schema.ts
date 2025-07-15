import { z } from "zod";

export const subscribeFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email jest wymagany")
    .email("Nie poprawny email")
    .max(50, "Maksymalnie 50 znaków"),
});

export type SubscribeFormSchema = z.infer<typeof subscribeFormSchema>;
