"use client";

import {
  AddPetButton,
  EmptyResult,
  PetItem,
} from "@/app/(main)/(private)/profile/_components/pets/pets-section";
import { DialogWrapper } from "@/components/dialog-wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ArrowLeft, PawPrintIcon } from "lucide-react";
import type { ControllerRenderProps } from "react-hook-form";

type PetSelectionProps = {
  field: ControllerRenderProps<
    {
      startTime: Date;
      date: Date;
      guestEmail: string;
      guestName: string;
      guestNotes?: string | undefined;
      petId?: string | undefined;
    },
    "petId"
  >;
  serviceId: string;
  disabled: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTimeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PetSelection({
  field,
  disabled,
  serviceId,
  isOpen,
  setIsOpen,
  setIsTimeDialogOpen,
}: PetSelectionProps) {
  const { data: pets } = api.private.pet.getAllOwn.useQuery();
  return (
    <>
      <DialogWrapper
        title="Wybierz zwierzaka"
        description=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Button
          variant="link"
          className="mb-3 w-min"
          onClick={() => {
            setIsOpen(false);
            setIsTimeDialogOpen(true);
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Wróć
        </Button>

        {
          <div className="scrollbar-hide -mx-2.5 flex items-start gap-x-2 overflow-x-scroll px-2.5 py-2 lg:gap-x-4">
            {pets && pets.length > 0 ? (
              pets?.map((pet) => (
                <div
                  key={pet.id}
                  onClick={() => {
                    field.onChange(field.value === pet.id ? "" : pet.id);
                  }}
                  className={cn(
                    "cursor-pointer border border-transparent px-2",
                    {
                      "text-primary border-primary/20 bg-card rounded-lg shadow":
                        pet.id === field.value,
                    },
                  )}
                >
                  <PetItem pet={pet} />
                </div>
              ))
            ) : (
              <EmptyResult />
            )}
            <AddPetButton
              href={`/profile/pets/add?redirect=/appointments/new/${serviceId}`}
              className="mx-2"
            />
          </div>
        }
        <div className="mt-4 flex justify-end">
          <Button onClick={() => setIsOpen(false)} className="w-full sm:w-auto">
            Ok
          </Button>
        </div>
      </DialogWrapper>
      <Button
        disabled={disabled}
        type="button"
        variant="outline"
        className={cn(
          "border-foreground flex w-full pl-3 text-left font-normal",
          disabled && "text-muted-foreground",
        )}
        onClick={() => setIsOpen(true)}
      >
        {field.value
          ? pets?.find((pet) => pet.id === field.value)?.name
          : "Wybierz pupila"}
        <PawPrintIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>
    </>
  );
}
