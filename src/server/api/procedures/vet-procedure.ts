import { TRPCError } from "@trpc/server";
import { t } from "../trpc";
import { publicProcedure } from "./public-procedure";
import { getCurrentUser } from "@/auth/current-user";

export const vetProcedure = publicProcedure.use(
  t.middleware(async ({ next, ctx }) => {
    const user = await getCurrentUser();
    if (!user?.roles.includes("VET")) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Brak uprawnien",
      });
    }

    return next({
      ctx: {
        ...ctx,
        user,
      },
    });
  }),
);
