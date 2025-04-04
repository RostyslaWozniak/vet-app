import { TRPCError } from "@trpc/server";
import { AdminServicesRepository } from "./admin-services.repository";
import { AdminServicesSchema } from "./admin-services.schema";

export class AdminServicesService {
  public static async getAll() {
    return await AdminServicesRepository.findAll();
  }

  public static async getById(id: string) {
    return await AdminServicesRepository.findById(id);
  }

  public static async create(unsafeData: unknown) {
    const { data, success } = AdminServicesSchema.create.safeParse(unsafeData);
    if (!success)
      throw new TRPCError({ code: "BAD_REQUEST", message: "Błąd walidacji" });
    return await AdminServicesRepository.create(data);
  }

  public static async update(unsafeData: unknown) {
    const { data, success } = AdminServicesSchema.update.safeParse(unsafeData);
    if (!success)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Błąd walidacji",
      });
    return await AdminServicesRepository.update(data);
  }

  public static async delete(unsafeData: unknown) {
    const { data, success } = AdminServicesSchema.delete.safeParse(unsafeData);
    if (!success)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Błąd walidacji",
      });
    return await AdminServicesRepository.delete(data);
  }
}
