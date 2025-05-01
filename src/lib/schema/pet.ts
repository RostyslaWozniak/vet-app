import { z } from "zod";

export const petFormSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane"),
  species: z.string().min(1, "Gatunek jest wymagany"),
  breed: z.string().optional(),
  age: z.string().optional(),
});

export type PetFromSchema = z.infer<typeof petFormSchema>;
