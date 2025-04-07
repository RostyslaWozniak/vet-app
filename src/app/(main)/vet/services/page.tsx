import { TableWrapper } from "@/components/table-wrapper";
import { H2 } from "@/components/typography";
import { api } from "@/trpc/server";
import { servicesTableColumns } from "./_component/services-table/services-table-columns";
import { SelectVetServices } from "./_component/select-vet-services";

export default async function VetServicesPage() {
  const allServices = await api.vet.service.getAll();
  const selectedServices = await api.vet.service.getAllOwn();
  return (
    <div className="relative space-y-8">
      <H2>Twoje usługi</H2>

      <TableWrapper columns={servicesTableColumns} data={selectedServices} />
      <SelectVetServices
        allServices={allServices}
        selectedServices={selectedServices}
      />
    </div>
  );
}
