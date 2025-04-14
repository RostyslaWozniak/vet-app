import { createTRPCRouter } from "../../trpc";
import { publicServicesRouter } from "./services";
import { publicUserRouter } from "./user";

export const publicRouter = createTRPCRouter({
  services: publicServicesRouter,
  user: publicUserRouter,
});
