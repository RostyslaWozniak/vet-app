import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, "Email jest wymagany").email("Niepoprawny email"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
