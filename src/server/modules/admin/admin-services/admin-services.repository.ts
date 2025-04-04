import { db } from "@/server/db";
import type {
  AdminServicesCreateType,
  AdminServicesDeleteType,
  AdminServicesUpdateType,
} from "./admin-services.types";

export class AdminServicesRepository {
  public static async findAll() {
    return await db.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  public static async findById(id: string) {
    return await db.service.findUnique({ where: { id } });
  }

  public static async create(data: AdminServicesCreateType) {
    return await db.service.create({ data });
  }

  public static async update(data: AdminServicesUpdateType) {
    return await db.service.update({ where: { id: data.id }, data });
  }

  public static async delete(data: AdminServicesDeleteType) {
    return await db.service.delete({ where: { id: data.id } });
  }
}
