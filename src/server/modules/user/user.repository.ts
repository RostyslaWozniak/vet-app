import { db } from "@/server/db";
import type { $Enums } from "@prisma/client";

export class UserRepository {
  public static async findById(id: string) {
    return await db.user.findUnique({ where: { id } });
  }
  public static async findAllByRole(role: $Enums.Roles) {
    return await db.user.findMany({
      where: { roles: { has: role } },
      select: { id: true, name: true, roles: true },
    });
  }
}
