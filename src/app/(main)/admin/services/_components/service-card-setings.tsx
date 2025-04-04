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
import { CreateUpdateServiceForm } from "./forms/create-update-service-form";
import type { AdminServiceGetAllDTO } from "@/server/modules/admin/admin-services/admin-services.types";
import { DeleteServiceButton } from "./delete-service-button";

export function ServiceCardSetings({
  service,
}: {
  service: AdminServiceGetAllDTO;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Edit Product"
        description="Make changes to your product here. Do not forget to save changes."
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        className="scrollbar-hide flex max-h-[90vh] w-[1000px] flex-col justify-end gap-3"
        overflowYScroll
      >
        <CreateUpdateServiceForm
          service={service}
          setIsEditOpen={setIsEditOpen}
        />
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
        <DeleteServiceButton
          id={service.id}
          setIsDeleteOpen={setIsDeleteOpen}
        />
      </DialogWrapper>

      <DropdownWrapper vertical>
        <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
          <IconMenu icon={Edit} text="Edit" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
          <IconMenu icon={Trash2} text="Delete" className="text-destructive" />
        </DropdownMenuItem>
      </DropdownWrapper>
    </>
  );
}
