import { H2 } from "@/components/typography";
import { api } from "@/trpc/server";
import type { RouterOutputs } from "@/trpc/react";
import { PetCard } from "../../_components/pets/pet-card";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/back-button";

export type Pet = RouterOutputs["private"]["pet"]["getAllOwn"][number];

export default async function ProfilePetsPage({
  params,
}: {
  params: Promise<{ petId: string }>;
}) {
  const { petId } = await params;
  const pet = await api.private.pet.getOwnOneById({ petId });

  if (!pet) return notFound();
  return (
    <div className="flex flex-col">
      <div>
        <BackButton />
      </div>
      <div className="flex items-center justify-between">
        <H2 className="text-muted-foreground my-4 !text-start text-base md:!text-xl">
          {pet.name}
        </H2>
      </div>
      <PetCard key={pet.id} pet={pet} />
    </div>
  );
}
