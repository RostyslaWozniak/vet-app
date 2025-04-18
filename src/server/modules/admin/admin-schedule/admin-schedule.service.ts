import { TRPCError } from "@trpc/server";
import { UserService } from "../../user/user.service";
import { AdminScheduleRepository } from "./admin-schedule.repository";
import { groupBy } from "@/lib/utils";

export class AdminScheduleService {
  public static async getByUserId(userId: string) {
    const vet = await UserService.getByIdAndCheckRole(userId, "VET");
    if (!vet)
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Brak uprawnien" });

    const schedule = await AdminScheduleRepository.findByVetId(vet.id);
    if (!schedule) return { appointments: [], availabilities: [] };

    const appointmentsByDate = groupBy(schedule.appointments, (a) =>
      a.startTime.toISOString(),
    );

    const appointments = Object.entries(appointmentsByDate)
      .map(([_key, value]) => {
        return value.at(-1);
      })
      .filter((app) => app !== undefined);

    return {
      appointments: appointments,
      availabilities: schedule.availabilities,
    };
  }
}
