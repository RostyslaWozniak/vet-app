import { createTRPCRouter } from "../../trpc";
import { adminServicesRouter } from "./services";

export const adminRouter = createTRPCRouter({
  services: adminServicesRouter,
});
