import { db } from "@/server/db";
import { TableWrapper } from "@/components/table-wrapper";
import { vetsTableColumns } from "./_components/vets-table/vets-table-columns";
import { H2 } from "@/components/typography";

export default async function AdminClientsPage() {
  const vets = await db.user.findMany({
    where: {
      roles: {
        has: "VET",
      },
    },
  });
  return (
    <div className="space-y-8">
      <H2>Weterynarze ({vets.length})</H2>
      <TableWrapper columns={vetsTableColumns} data={vets} />
    </div>
  );
}
