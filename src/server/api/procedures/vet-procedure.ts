import { TRPCError } from "@trpc/server";
import { t } from "../trpc";
import { publicProcedure } from "./public-procedure";

export const vetProcedure = publicProcedure.use(
  t.middleware(async ({ next, ctx }) => {
    if (!ctx.user?.roles.includes("VET")) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Brak uprawnien",
      });
    }

    return next();
  }),
);
