import { H2 } from "@/components/typography";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Plus } from "lucide-react";
import { columns } from "./_components/services-table/columns";
import { TableWrapper } from "@/components/table-wrapper";
import { LinkButton } from "@/components/link-button";

export default async function AdminServicesPage() {
  const services = await api.admin.services.getAll();
  return (
    <div className="relative space-y-8">
      <H2>Usługi</H2>
      <TableWrapper columns={columns} data={services} />
      <LinkButton
        href="/admin/services/new"
        className={cn("top-0 right-0 w-full md:absolute md:w-auto")}
      >
        <Plus /> Dodaj usługe
      </LinkButton>
    </div>
  );
}
