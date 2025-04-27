import { getCurrentUser } from "@/auth/current-user";
import { Avatar } from "@/components/custom-ui/avatar";
import { LinkButton } from "@/components/link-button";
import { H2 } from "@/components/typography";
import { formatYearsAndMonths } from "@/lib/formatters";
import { db } from "@/server/db";
import { BoneIcon, CakeIcon, PawPrintIcon, Plus } from "lucide-react";

export default async function ProfilePetsPage() {
  const user = await getCurrentUser({ redirectIfNotFound: true });
  const pets = await db.pet.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <div>
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
              className="text-xs sm:text-sm"
            >
              <Plus /> Dodaj pupila
            </LinkButton>
          )}
        </div>
        <div className="scrollbar-hide grid flex-col gap-x-4 gap-y-2 overflow-x-scroll md:grid-cols-2">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="flex flex-col gap-4 rounded-lg border p-2"
            >
              <div className="flex items-center gap-x-2">
                <Avatar
                  photo={pet.photo}
                  name={pet.name}
                  className="h-16 w-16 lg:h-20 lg:w-20"
                />
                <div className="flex flex-grow items-center text-start font-bold">
                  <span className="text-2xl">{pet.name}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-2 pl-2">
                <div className="flex gap-x-2">
                  <PawPrintIcon size="20" />
                  {pet.species}
                </div>
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
                      {formatYearsAndMonths(pet.birthday)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
