"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { DropdownWrapper } from "@/components/dropdown-wrapper";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import IconMenu from "@/components/ui/icon-menu";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import type { $Enums } from "@prisma/client";
import { RolesToggleForm } from "../../../_components/forms/roles-toggle-form";

export function ClientsTableSetings({
  user,
}: {
  user: {
    id: string;
    roles: $Enums.Roles[];
  };
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Zmienianie uprawnień"
        description="Zmień uprawnienia użytkownika i zapisz zmiany."
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        className="scrollbar-hide flex max-h-[90vh] flex-col justify-end gap-3"
      >
        <RolesToggleForm user={user} setIsEditOpen={setIsEditOpen} />
      </DialogWrapper>
      <DialogWrapper
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        className="flex w-[500px] flex-row-reverse justify-start gap-3"
        closeButton="Cancel"
        closeButtonVariant={{ variant: "outline", size: "default" }}
      >
        {/* <DeleteServiceButton
          id={service.id}
          setIsDeleteOpen={setIsDeleteOpen}
        /> */}
        DELETE
      </DialogWrapper>

      <DropdownWrapper vertical className="w-52">
        <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
          <IconMenu icon={Edit} text="Zmień uprawnienia" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
          <IconMenu icon={Trash2} text="Usuń" className="text-destructive" />
        </DropdownMenuItem>
      </DropdownWrapper>
    </>
  );
}
