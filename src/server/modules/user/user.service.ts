import type { $Enums } from "@prisma/client";
import { UserRepository } from "./user.repository";
import { getCurrentUser } from "@/auth/current-user";

export class UserService {
  public static getAll(role: $Enums.Roles) {
    return UserRepository.findAllByRole(role);
  }

  public static async getCurrentUser() {
    const user = await getCurrentUser({ withFullUser: true });
    return user;
  }

  public static async getByIdAndCheckRole(userId: string, role: $Enums.Roles) {
    const user = await this.getById(userId);
    if (!user) return null;
    if (!user.roles.includes(role)) return null;
    return user;
  }

  public static async getById(userId: string) {
    return await UserRepository.findById(userId);
  }
}
