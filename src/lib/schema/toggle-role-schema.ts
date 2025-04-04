import { $Enums } from "@prisma/client";
import { z } from "zod";

export const rolesList = [
  $Enums.Roles.ADMIN,
  $Enums.Roles.VET,
  $Enums.Roles.CLIENT,
] as const;

export const toggleRoleSchema = z.object({
  userId: z.string(),
  roles: z
    .array(z.enum(rolesList))
    .min(1)
    .nonempty("Please select at least one role."),
});

export type ToggleRoleSchema = z.infer<typeof toggleRoleSchema>;
