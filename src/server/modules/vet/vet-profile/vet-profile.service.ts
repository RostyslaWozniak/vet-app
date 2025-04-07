import { VetProfileRepository } from "./vet-profile.repository";
import { TRPCError } from "@trpc/server";

export class VetProfileService {
  public static async getByUserId(userId: string) {
    return await VetProfileRepository.findByUserId(userId);
  }
  public static async getByUserIdOrThrow(userId: string) {
    const vet = await this.getByUserId(userId);
    if (!vet)
      throw new TRPCError({ code: "NOT_FOUND", message: "Vet not found" });
    return vet;
  }
  public static async getByUserIdOrCreate(userId: string) {
    const vet = await this.getByUserId(userId);
    if (!vet) {
      const newVet = await VetProfileRepository.create({ userId });
      return newVet;
    }
    return vet;
  }
}
