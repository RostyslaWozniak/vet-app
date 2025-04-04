import type { z } from "zod";
import type { AdminServicesSchema } from "./admin-services.schema";
import type { RouterOutputs } from "@/trpc/react";

export type AdminServicesCreateType = z.infer<
  typeof AdminServicesSchema.create
>;
export type AdminServicesUpdateType = z.infer<
  typeof AdminServicesSchema.update
>;
export type AdminServicesDeleteType = z.infer<
  typeof AdminServicesSchema.delete
>;

export type AdminServiceGetAllDTO =
  RouterOutputs["admin"]["services"]["getAll"][number];
