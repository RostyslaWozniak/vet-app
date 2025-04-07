import { H2 } from "@/components/typography";
import { api } from "@/trpc/server";
import { servicesTableColumns } from "../_component/services-table/services-table-columns";
import { TableWrapper } from "@/components/table-wrapper";

export default async function VetServicesPage() {
  const services = await api.vet.service.getAll();

  return (
    <div className="relative space-y-8">
      <H2>Wybierz swoje usługi</H2>
      <TableWrapper columns={servicesTableColumns} data={services} />
    </div>
  );
}
