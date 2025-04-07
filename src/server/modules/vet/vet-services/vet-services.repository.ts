import { db } from "@/server/db";

export class VetServicesRepository {
  public static async findAll() {
    return await db.service.findMany();
  }

  public static async findAllByVetId(vetId: string) {
    return await db.service.findMany({
      where: {
        vetServices: {
          some: {
            vetId,
          },
        },
      },
    });
  }

  public static async findMany(serviceIds: string[]) {
    return await db.service.findMany({
      where: {
        id: {
          in: serviceIds,
        },
      },
    });
  }

  public static async deleteCreateManyTransaction(data: {
    services: string[];
    vetId: string;
  }) {
    return await db.$transaction(async (tx) => {
      await tx.vetService.deleteMany({
        where: {
          vetId: data.vetId,
        },
      });
      await tx.vetService.createMany({
        data: data.services.map((serviceId) => ({
          serviceId,
          vetId: data.vetId,
        })),
      });
    });
  }
}
