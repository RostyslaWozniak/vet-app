"use server";

import { getCurrentUser } from "@/auth/current-user";
import { toggleRoleSchema } from "@/lib/schema/toggle-role-schema";
import { db } from "@/server/db";

export async function toggleRole(unsafeData: unknown) {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });
  if (!currentUser.roles.includes("ADMIN")) return "Unauthorized";

  const { data, success } = toggleRoleSchema.safeParse(unsafeData);
  if (!success) return "Validation error";

  const user = await db.user.findUnique({ where: { id: data.userId } });
  if (!user) return "User not found";

  await db.user.update({
    where: { id: user.id },
    data: {
      roles: {
        set: data.roles,
      },
    },
  });

  //   await updateUserSessionData(updatedUser, await cookies());
}
