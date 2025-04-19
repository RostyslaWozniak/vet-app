import { createTRPCRouter } from "../../trpc";
import { privateAppointmentsRouter } from "./appointments";
import { publicUserRouter } from "./user";

export const privateRouter = createTRPCRouter({
  user: publicUserRouter,
  appointments: privateAppointmentsRouter,
});
