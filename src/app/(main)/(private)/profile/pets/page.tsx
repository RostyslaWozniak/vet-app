import { LinkButton } from "@/components/link-button";
import { H2 } from "@/components/typography";
import { PlusIcon } from "lucide-react";
import { api } from "@/trpc/server";
import type { RouterOutputs } from "@/trpc/react";
import { AddPetButtonLink } from "../_components/pets/add-pet-button-link";
import { PetCard } from "../_components/pets/pet-card";

export type Pet = RouterOutputs["private"]["pet"]["getAllOwn"][number];

export default async function ProfilePetsPage() {
  const pets = await api.private.pet.getAllOwn();
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <H2 className="text-muted-foreground my-4 !text-start text-base md:!text-xl">
          Moi pupile ({pets.length})
        </H2>
        {pets.length > 0 && (
          <LinkButton
            href="/profile/pets/add"
            variant="link"
            size="sm"
            className="hidden text-xs sm:flex sm:text-sm"
          >
            <PlusIcon /> Dodaj pupila
          </LinkButton>
        )}
      </div>
      <div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}

        <AddPetButtonLink />
      </div>
    </div>
  );
}
