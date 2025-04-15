"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowRight, Settings, User as UserIcon } from "lucide-react";
import { VetsTableSettings } from "./vets-table-settings";
import { mapRoles } from "@/lib/map-roles";
import { LinkButton } from "@/components/link-button";
import type { RouterOutputs } from "@/trpc/react";

export const vetsTableColumns: ColumnDef<
  RouterOutputs["admin"]["user"]["getAllByRole"][number]
>[] = [
  {
    accessorKey: "photo",
    header: "Zdjecie",
    cell: ({ row }) => (
      <div className="w-min">
        {row.original.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.original.photo}
            alt="zdjecie"
            className="min-h-10 min-w-10 rounded-full"
          />
        ) : (
          <UserIcon className="h-10 w-10" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Imię",
    cell: ({ row }) => <p>{row.original.name}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="w-min">{row.original.email}</div>,
  },
  {
    accessorKey: "role",
    header: "Rola",
    cell: ({ row }) => (
      <div className="w-100">{mapRoles(row.original.roles)}</div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Grafik",
    cell: ({ row }) => (
      <LinkButton
        href={`/admin/vets/${row.original.id}/schedule`}
        className="w-min"
        variant="link"
      >
        Zobacz grafik <ArrowRight />
      </LinkButton>
    ),
  },

  {
    accessorKey: "settings",
    header: () => <Settings />,
    cell: ({ row }) => (
      <div className="w-min">
        <VetsTableSettings user={row.original} />
      </div>
    ),
  },
];
