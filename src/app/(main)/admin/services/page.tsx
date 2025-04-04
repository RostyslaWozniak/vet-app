import { H2 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ServiceTable } from "./_components/services-table";
import { columns } from "./_components/services-table/columns";

export default async function AdminServicesPage() {
  const services = await api.admin.services.getAll();
  return (
    <div className="relative space-y-8">
      <H2>Usługi</H2>
      <Link
        href="/admin/services/new"
        className={cn(buttonVariants(), "absolute top-0 right-0")}
      >
        <Plus /> Dodaj usługe
      </Link>
      <div>
        <ServiceTable columns={columns} data={services} />
      </div>
    </div>
  );
}
