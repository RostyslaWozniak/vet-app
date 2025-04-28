import { BackButton } from "@/components/back-button";
import { AddEditPetForm } from "../../_components/pets/add-edit-pet-form";

export default async function ProfileAddPetPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect: string }>;
}) {
  const { redirect } = await searchParams;
  return (
    <div>
      <BackButton className="-mx-2.5 mb-2.5" />
      <AddEditPetForm redirectUrl={redirect} />
    </div>
  );
}
