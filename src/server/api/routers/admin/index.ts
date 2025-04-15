import { createTRPCRouter } from "../../trpc";
import { adminScheduleRouter } from "./schedule";
import { adminServicesRouter } from "./services";
import { adminUserRouter } from "./user";

export const adminRouter = createTRPCRouter({
  services: adminServicesRouter,
  schedule: adminScheduleRouter,
  user: adminUserRouter,
});
