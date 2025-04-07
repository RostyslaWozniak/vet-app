import { db } from "@/server/db";

export class VetProfileRepository {
  public static async findByUserId(userId: string) {
    return await db.vetProfile.findUnique({ where: { userId } });
  }
  public static async create(data: { userId: string }) {
    return await db.vetProfile.create({
      data,
    });
  }
}
