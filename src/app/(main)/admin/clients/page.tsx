import { db } from "@/server/db";
import { RolesToggleForm } from "../_componetns/forms/roles-toggle-form";

export default async function AdminClientsPage() {
  const clients = await db.user.findMany({
    where: {
      roles: {
        has: "CLIENT",
      },
    },
  });
  return (
    <div className="my-12">
      <h2 className="mb-4 text-4xl">Clients</h2>
      <div>
        {clients.map((client) => (
          <div key={client.id} className="mb-4 flex border-b py-2">
            <div className="flex flex-grow items-center gap-8">
              <p>Name: {client.name}</p>
              <p>Email: {client.email}</p>
            </div>
            <RolesToggleForm user={{ id: client.id, roles: client.roles }} />
          </div>
        ))}
      </div>
    </div>
  );
}
