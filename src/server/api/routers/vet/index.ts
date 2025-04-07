import { createTRPCRouter } from "../../trpc";
import { vetScheduleRouter } from "./schedule-router";
import { vetServiceRouter } from "./service-router";

export const vetRouter = createTRPCRouter({
  schedule: vetScheduleRouter,
  service: vetServiceRouter,
});
