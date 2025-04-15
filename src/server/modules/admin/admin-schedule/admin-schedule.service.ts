import { TRPCError } from "@trpc/server";
import { UserService } from "../../user/user.service";
import { AdminScheduleRepository } from "./admin-schedule.repository";

export class AdminScheduleService {
  public static async getByUserId(userId: string) {
    const vet = await UserService.getByIdAndCheckRole(userId, "VET");
    if (!vet)
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Brak uprawnien" });

    return await AdminScheduleRepository.findByVetId(vet.id);
  }
}
