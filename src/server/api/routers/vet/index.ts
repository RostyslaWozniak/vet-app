import { createTRPCRouter } from "../../trpc";
import { vetAppointmentsRouter } from "./appointments";
import { vetAvailabilitiesRouter } from "./availabilities";
import { vetScheduleRouter } from "./schedule";
import { vetServiceRouter } from "./service";

export const vetRouter = createTRPCRouter({
  appointments: vetAppointmentsRouter,
  availabilities: vetAvailabilitiesRouter,
  schedule: vetScheduleRouter,
  service: vetServiceRouter,
});
