import { api } from "@/trpc/server";
import { AddEditPetForm } from "../../../_components/pets/add-edit-pet-form";
import { notFound } from "next/navigation";

export default async function EditPetPage({
  params,
}: {
  params: Promise<{ petId: string }>;
}) {
  const { petId } = await params;
  const pet = await api.private.pet.getOwnOneById({ petId });

  if (!pet) return notFound();
  return (
    <>
      <AddEditPetForm pet={pet} />
    </>
  );
}
