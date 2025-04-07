import type { z } from "zod";
import type { VetServicesSchema } from "./vet-services.schema";

export type VetServicesMutateListType = z.infer<
  typeof VetServicesSchema.mutateList
>;
