import { createTRPCRouter } from "../../trpc";
import { userRouter } from "./user";

export const privateRouter = createTRPCRouter({
  user: userRouter,
});
