import { createTRPCRouter } from "../../trpc";
import { publicServicesRouter } from "./services";

export const publicRouter = createTRPCRouter({
  services: publicServicesRouter,
});
