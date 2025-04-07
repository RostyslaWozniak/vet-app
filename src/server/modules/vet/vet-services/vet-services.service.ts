import { TRPCError } from "@trpc/server";
import { VetProfileService } from "../vet-profile/vet-profile.service";
import { VetServicesRepository } from "./vet-services.repository";
import type { VetServicesMutateListType } from "./vet-services.types";

export class VetServicesService {
  public static async getAll() {
    return await VetServicesRepository.findAll();
  }
  public static async getAllOwn(userId: string) {
    const vetProfile = await VetProfileService.getByUserIdOrThrow(userId);

    return await VetServicesRepository.findAllByVetId(vetProfile.id);
  }

  public static async mutateList({
    services,
    userId,
  }: VetServicesMutateListType & {
    userId: string;
  }) {
    const vetProfile = await this.getVetProfile(userId);
    try {
      await VetServicesRepository.findMany(services);
    } catch {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Usługi nie zostały znalezione",
      });
    }

    return await VetServicesRepository.deleteCreateManyTransaction({
      services,
      vetId: vetProfile.id,
    });
  }

  // Private methods
  private static async getVetProfile(userId: string) {
    const vetProfile = await VetProfileService.getByUserIdOrThrow(userId);
    return vetProfile;
  }
}
