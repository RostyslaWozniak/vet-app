import { createTRPCRouter } from "../../trpc";
import { publicAppointmentsRouter } from "./appointments";
import { publicServicesRouter } from "./services";
import { publicUserRouter } from "./user";

export const publicRouter = createTRPCRouter({
  services: publicServicesRouter,
  user: publicUserRouter,
  appointments: publicAppointmentsRouter,
});
