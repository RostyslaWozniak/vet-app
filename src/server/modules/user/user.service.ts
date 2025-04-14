import type { $Enums } from "@prisma/client";
import { UserRepository } from "./user.repository";
import { getCurrentUser } from "@/auth/current-user";

export class UserService {
  public static getAll(id: string, role: $Enums.Roles) {
    return UserRepository.findAllByRole(role);
  }

  public static async getCurrentUser() {
    const user = await getCurrentUser({ withFullUser: true });
    return user;
  }
}
