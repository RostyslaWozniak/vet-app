import { db } from "@/server/db";
import type { $Enums, Prisma } from "@prisma/client";
import { UserQueries } from "./user.queries";

export class UserRepository {
  public static async findById(id: string, select?: Prisma.UserSelect) {
    return await db.user.findUnique({
      where: { id },
      select: select ?? UserQueries.selectFields,
    });
  }
  public static async findAllByRole(
    role: $Enums.Roles,
    select?: Prisma.UserSelect,
  ) {
    return await db.user.findMany({
      where: { roles: { has: role } },
      select: select ?? UserQueries.selectFields,
    });
  }
}
