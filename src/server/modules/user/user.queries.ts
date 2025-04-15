import { Prisma } from "@prisma/client";

export class UserQueries {
  public static selectFields = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    name: true,
    email: true,
    photo: true,
    roles: true,
  });
}
