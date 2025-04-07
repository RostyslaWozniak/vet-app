import { z } from "zod";

export class VetServicesSchema {
  public static mutateList = z.object({ services: z.array(z.string().min(1)) });
}
