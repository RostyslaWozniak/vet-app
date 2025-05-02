"use client";

import type { Pet } from "../../pets/page";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { EditIcon, MoreVerticalIcon, PlusIcon, TrashIcon } from "lucide-react";
import { DialogWrapper } from "@/components/dialog-wrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { LinkButton } from "@/components/link-button";
import Link from "next/link";
import { RemovePetButton } from "./remove-pet-button";

export function PetCardMore({ pet }: { pet: Pet }) {
  const [isDropdownOpen, setIsDropddownOpen] = useState(false);
  const [isDeletetOpen, setIsDeleteOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      <DialogWrapper
        title={`${pet.name} zostanie usuniety(a)`}
        description="Czy napewno chcesz usunąć zwirzaka? Ta operacja nie będzie mogła być odwrócona!"
        isOpen={isDeletetOpen}
        setIsOpen={setIsDeleteOpen}
        closeButton="Anuluj"
        contentClassName="flex items-end sm:min-w-125"
        className="flex"
      >
        <RemovePetButton petId={pet.id} setIsDeleteOpen={setIsDeleteOpen} />
      </DialogWrapper>
      {isDesktop ? (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropddownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDropddownOpen((prev) => !prev)}
            >
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>{pet.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-muted-foreground relative w-full justify-start text-start",
              )}
            >
              <Link
                href={`/appointments/new?petId=${pet.id}`}
                className="absolute inset-0"
              />
              <PlusIcon className="text-primary-foreground bg-primary rounded-full stroke-4 p-0.5" />{" "}
              Umów wizytę
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-muted-foreground relative w-full justify-start text-start",
              )}
            >
              <Link
                href={`/profile/pets/${pet.id}/edit`}
                className="absolute inset-0"
              />
              <EditIcon /> Edytuj zwierzaka
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDeleteOpen(true)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-destructive hover:text-destructive w-full justify-start text-start",
              )}
            >
              <TrashIcon /> Usuń zwierzaka
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <DialogWrapper
            title={pet.name}
            isOpen={isDropdownOpen}
            setIsOpen={setIsDropddownOpen}
            contentClassName="pb-0"
          >
            <LinkButton
              href={`/appointments/new?petId=${pet.id}`}
              variant="ghost"
              className="text-muted-foreground h-12 w-full justify-start gap-x-6 text-start"
            >
              <PlusIcon className="text-primary-foreground bg-primary min-h-5 min-w-5 rounded-full stroke-4 p-0.5" />{" "}
              Umów wizytę
            </LinkButton>
            <LinkButton
              href={`/profile/pets/${pet.id}/edit`}
              variant="ghost"
              className="text-muted-foreground h-12 w-full justify-start gap-x-6 text-start"
            >
              <EditIcon /> Edytuj dane zwierzaka
            </LinkButton>

            <Button
              onClick={() => {
                setIsDeleteOpen(true);
                setIsDropddownOpen(false);
              }}
              variant="ghost"
              className="text-destructive hover:text-destructive h-12 w-full justify-start gap-x-6 text-start"
            >
              <TrashIcon /> Usuń swojego zwierzaka
            </Button>
          </DialogWrapper>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDropddownOpen((prev) => !prev)}
          >
            <MoreVerticalIcon />
          </Button>
        </>
      )}
    </>
  );
}
