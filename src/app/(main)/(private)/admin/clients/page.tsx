import { db } from "@/server/db";
import { TableWrapper } from "@/components/table-wrapper";
import { clientsTableColumns } from "./_components/clients-table/clients-table-columns";
import { H2 } from "@/components/typography";

export default async function AdminClientsPage() {
  const clients = await db.user.findMany({
    where: {
      roles: {
        has: "CLIENT",
      },
    },
  });
  return (
    <div className="space-y-8">
      <H2>Klienci zarejestrowani ({clients.length})</H2>
      <TableWrapper columns={clientsTableColumns} data={clients} />
    </div>
  );
}
