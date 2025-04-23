"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useMemo, useState } from "react";
import { SelectVetServicesForm } from "./forms/select-vet-services-form";
import type { RouterOutputs } from "@/trpc/react";

type SelectVetServicesProps = {
  allServices: RouterOutputs["vet"]["service"]["getAll"];
  selectedServices: RouterOutputs["vet"]["service"]["getAllOwn"];
};

export type SelectableServiceType =
  RouterOutputs["vet"]["service"]["getAll"][number] & { isChosen: boolean };

export function SelectVetServices({
  allServices,
  selectedServices,
}: SelectVetServicesProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const servicesWithChosenFlag = useMemo(() => {
    return allServices.map((service) => ({
      ...service,
      isChosen: selectedServices.some((own) => own.id === service.id),
    }));
  }, [allServices, selectedServices]);

  return (
    <div>
      <DialogWrapper
        title="Wybierz swoje usługi"
        description="Wybierz usługi, które chcesz oferować w swojej klinice, i nie zapomnij zapisać zmiany."
        isOpen={isSelectOpen}
        setIsOpen={setIsSelectOpen}
        className="scrollbar-hide flex max-h-[90vh] flex-col justify-end gap-3"
        contentClassName="overflow-y-scroll"
      >
        <SelectVetServicesForm
          services={servicesWithChosenFlag}
          setIsSelectOpen={setIsSelectOpen}
        />
      </DialogWrapper>
      <Button
        className="absolute top-0 right-0"
        onClick={() => setIsSelectOpen((prev) => !prev)}
      >
        <Edit /> Edytuj usługi
      </Button>
    </div>
  );
}
