import { TableWrapper } from "@/components/table-wrapper";
import { vetsTableColumns } from "./_components/vets-table/vets-table-columns";
import { H2 } from "@/components/typography";
import { api } from "@/trpc/server";

export default async function AdminVetsPage() {
  const vets = await api.admin.user.getAllByRole({ role: "VET" });
  return (
    <div className="space-y-8">
      <H2>Weterynarze ({vets.length})</H2>
      <TableWrapper columns={vetsTableColumns} data={vets} />
    </div>
  );
}
