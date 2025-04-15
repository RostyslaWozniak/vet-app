import { createTRPCRouter } from "../../trpc";
import { publicAppointmentsRouter } from "./appointments";
import { publicUserRouter } from "./user";

export const privateRouter = createTRPCRouter({
  user: publicUserRouter,
  appointments: publicAppointmentsRouter,
});
