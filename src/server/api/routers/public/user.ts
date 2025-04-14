import { UserService } from "@/server/modules/user/user.service";
import { publicProcedure } from "../../procedures/public-procedure";
import { createTRPCRouter } from "../../trpc";

export const publicUserRouter = createTRPCRouter({
  getCurrentUser: publicProcedure.query(async () => {
    return await UserService.getCurrentUser();
  }),
});
