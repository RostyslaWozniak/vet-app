import { Avatar } from "@/components/custom-ui/avatar";
import { LinkButton } from "@/components/link-button";
import { H2 } from "@/components/typography";
import { CatIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import type { Pet } from "../../pets/page";
import { cn } from "@/lib/utils";

export function PetsSection({ pets }: { pets: Pet[] }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <H2 className="text-muted-foreground !text-start text-base md:!text-xl">
          Moi pupile ({pets.length})
        </H2>
        {pets.length > 0 && (
          <LinkButton
            href="/profile/pets"
            variant="link"
            size="sm"
            className="text-xs sm:text-sm"
          >
            Zobacz wszystkie
          </LinkButton>
        )}
      </div>
      <PetsList pets={pets} />
    </div>
  );
}

function PetsList({ pets }: { pets: Pet[] }) {
  return (
    <div className="scrollbar-hide -mx-2.5 flex items-start gap-x-2 overflow-x-scroll px-2.5 py-2 lg:gap-x-4">
      {pets.length > 0 ? (
        pets.map((pet) => (
          <div key={pet.id} className="relative isolate">
            <Link
              href={`/profile/pets/${pet.id}`}
              className="absolute inset-0 z-50"
            />
            <PetItem pet={pet} />
          </div>
        ))
      ) : (
        <EmptyResult />
      )}
      <AddPetButton href="/profile/pets/add" />
    </div>
  );
}

export function PetItem({ pet }: { pet: Pet }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg px-2 pt-3 pb-2">
      <Avatar
        photo={pet.photo}
        name={pet.name}
        className="h-16 w-16 lg:h-20 lg:w-20"
      />
      <h3 className="w-min text-center text-xs font-medium">{pet.name}</h3>
    </div>
  );
}

export function EmptyResult() {
  return (
    <div className="bg-muted/30 flex h-24 min-w-24 flex-col items-center justify-center rounded-lg border border-dashed px-2 pt-4 pb-3 lg:h-28 lg:w-28">
      <CatIcon className="text-muted-foreground/60 mb-2 h-9 w-9" />
      <h3 className="text-xs font-medium">Brak pupilow</h3>
    </div>
  );
}

export function AddPetButton({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-primary border-primary/20 relative mx-2 my-auto flex h-24 min-w-24 flex-col items-center justify-center rounded-lg border px-2 py-3 shadow lg:h-28 lg:w-28",
        className,
      )}
    >
      <LinkButton
        variant={"link"}
        href={href}
        className="absolute inset-0 h-auto rounded-lg"
      />
      <div className="flex flex-grow items-center justify-center">
        <PlusIcon className="min-h-10 min-w-10" />
      </div>
      <h3 className="text-xs font-medium">Dodaj pupila</h3>
    </div>
  );
}
