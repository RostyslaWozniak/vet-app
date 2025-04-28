import { Avatar } from "@/components/custom-ui/avatar";
import type { Pet } from "../../pets/page";
import { PetCardMore } from "./pet-card-more";
import { BoneIcon, CakeIcon, PawPrintIcon } from "lucide-react";
import { formatYearsAndMonthsToString } from "@/lib/formatters";

export function PetCard({ pet }: { pet: Pet }) {
  return (
    <div
      key={pet.id}
      className="relative flex min-h-38 flex-col gap-4 rounded-lg border p-3 lg:p-4"
    >
      <div className="absolute top-1 right-1">
        <PetCardMore pet={pet} />
      </div>
      <div className="flex flex-grow items-start gap-x-4">
        <Avatar
          photo={pet.photo}
          name={pet.name}
          className="h-16 w-16 lg:h-20 lg:w-20"
        />
        <div className="flex flex-grow flex-col items-start text-start font-bold">
          <p className="text-2xl">{pet.name}</p>
          <div className="flex gap-x-2">
            <PawPrintIcon size="20" />
            {pet.species}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 pl-2 text-sm">
        {pet.breed && (
          <div className="flex gap-x-2">
            <BoneIcon size="20" />
            <p className="text-nowrap">{pet.breed}</p>
          </div>
        )}
        {pet.birthday && (
          <div className="flex gap-x-2">
            <CakeIcon size="20" />
            <p className="text-nowrap">
              {formatYearsAndMonthsToString(pet.birthday)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
