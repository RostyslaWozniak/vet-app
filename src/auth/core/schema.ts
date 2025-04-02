import { $Enums } from "@prisma/client";
import { z } from "zod";

const userRoles = [
  $Enums.Roles.ADMIN,
  $Enums.Roles.VET,
  $Enums.Roles.CLIENT,
] as const;

export const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(userRoles),
});
