import { z } from "zod";

export class AdminServicesSchema {
  public static getById = z.object({ id: z.string().min(1) });
  public static create = z.object({
    name: z.string().min(1, "Pole jest wymagane"),
    description: z.string().optional(),
    durationInMinutes: z.coerce
      .number()
      .int()
      .positive("Czas musi być dodatni"),
    isActive: z.boolean().default(true),
  });
  public static update = this.create.extend({
    id: z.string().min(1),
  });

  public static delete = z.object({ id: z.string() });
}
