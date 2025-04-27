import { createTRPCRouter } from "../../trpc";
import { privateAppointmentsRouter } from "./appointments";
import { privatePetRouter } from "./pet";
import { privateUserRouter } from "./user";

export const privateRouter = createTRPCRouter({
  pet: privatePetRouter,
  user: privateUserRouter,
  appointments: privateAppointmentsRouter,
});
