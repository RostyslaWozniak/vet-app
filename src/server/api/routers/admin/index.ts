import { createTRPCRouter } from "../../trpc";
import { adminAppointmentsRouter } from "./appointments";
import { adminAvailabilitiesRouter } from "./availabilities";
import { adminScheduleRouter } from "./schedule";
import { adminServicesRouter } from "./services";
import { adminUserRouter } from "./user";

export const adminRouter = createTRPCRouter({
  appointments: adminAppointmentsRouter,
  availabilities: adminAvailabilitiesRouter,
  schedule: adminScheduleRouter,
  services: adminServicesRouter,
  user: adminUserRouter,
});
