import { LinkButton } from "@/components/link-button";
import { PawPrintIcon, PlusIcon } from "lucide-react";

export function AddPetButtonLink() {
  return (
    <div className="text-primary bg-primary/10 border-primary relative my-auto flex h-38 flex-col items-center justify-center rounded-lg border px-2 py-3 sm:hidden lg:h-28 lg:w-28">
      <LinkButton
        variant={"link"}
        href="/profile/pets/add"
        className="absolute inset-0 h-auto rounded-lg"
      />
      <div className="flex flex-grow items-center justify-center">
        <PawPrintIcon className="min-h-14 min-w-14 stroke-[1.5px]" />
      </div>
      <div className="flex items-center text-sm font-medium">
        <PlusIcon className="mr-2" />
        Dodaj pupila
      </div>
    </div>
  );
}
