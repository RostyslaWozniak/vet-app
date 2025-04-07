import type { $Enums } from "@prisma/client";
import { UserRepository } from "./user.repository";

export class UserService {
  public static getAll(id: string, role: $Enums.Roles) {
    return UserRepository.findAllByRole(role);
  }
}
