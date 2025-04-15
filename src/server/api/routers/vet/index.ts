import { createTRPCRouter } from "../../trpc";
import { vetScheduleRouter } from "./schedule";
import { vetServiceRouter } from "./service";

export const vetRouter = createTRPCRouter({
  schedule: vetScheduleRouter,
  service: vetServiceRouter,
});
