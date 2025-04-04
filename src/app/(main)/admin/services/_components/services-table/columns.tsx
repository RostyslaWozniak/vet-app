"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import type { AdminServiceGetAllDTO } from "@/server/modules/admin/admin-services/admin-services.types";
import { ServiceTableSetings } from "./table-setings";

export const columns: ColumnDef<AdminServiceGetAllDTO>[] = [
  {
    accessorKey: "name",
    header: "Nazwa",
    cell: ({ row }) => <p>{row.original.name}</p>,
  },
  {
    accessorKey: "duration",
    header: "Czas",
    cell: ({ row }) => <p>{row.original.durationInMinutes} min.</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.original.isActive ? (
          <Badge variant="default" className="bg-emerald-500 text-white">
            Aktywny
          </Badge>
        ) : (
          <Badge variant="destructive">Nieaktywny</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Opis",
    cell: ({ row }) => (
      <>
        {row.original.description ? (
          <p>{row.original.description}</p>
        ) : (
          <Badge variant="destructive">N/A</Badge>
        )}
      </>
    ),
  },

  {
    accessorKey: "settings",
    header: () => <Settings />,
    cell: ({ row }) => (
      <div>
        <ServiceTableSetings service={row.original} />
      </div>
    ),
  },
];
