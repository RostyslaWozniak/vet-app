import { BackButton } from "@/components/back-button";
import { AddEditPetForm } from "../../_components/pets/add-edit-pet-form";

export default function ProfileAddPetPage() {
  return (
    <div>
      <BackButton className="-mx-2.5 mb-2.5" />
      <AddEditPetForm pet={undefined} />
    </div>
  );
}
