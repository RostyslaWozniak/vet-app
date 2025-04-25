import { TableWrapper } from "@/components/table-wrapper";
import { H2 } from "@/components/typography";
import { api } from "@/trpc/server";
import { servicesTableColumns } from "./_component/services-table/services-table-columns";
import { SelectVetServices } from "./_component/select-vet-services";
import { EmptyResult } from "@/components/empty-result";
import { TableIcon } from "lucide-react";

export default async function VetServicesPage() {
  const allServices = await api.vet.service.getAll();
  const selectedServices = await api.vet.service.getAllOwn();
  return (
    <div className="relative space-y-8">
      <H2>Twoje usługi</H2>

      <TableWrapper
        columns={servicesTableColumns}
        data={selectedServices}
        emptyTableComponent={
          <EmptyResult
            title="Brak wybranych usług"
            icon={TableIcon}
            className="border-none"
            actionButton={
              <SelectVetServices
                trigerClassName="mt-2"
                allServices={allServices}
                selectedServices={selectedServices}
              />
            }
          />
        }
      />
      {selectedServices.length > 0 && (
        <SelectVetServices
          allServices={allServices}
          selectedServices={selectedServices}
          trigerClassName="absolute top-0 right-0"
        />
      )}
    </div>
  );
}
