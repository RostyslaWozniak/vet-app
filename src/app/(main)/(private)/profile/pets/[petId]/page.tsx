import { api } from "@/trpc/server";
import type { RouterOutputs } from "@/trpc/react";
import { PetCard } from "../../_components/pets/pet-card";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/back-button";
import { AppointmentsSection } from "../../_components/appointments/appointments-section";
import { EmptyResult } from "@/components/empty-result";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { LinkButton } from "@/components/link-button";

export type Pet = RouterOutputs["private"]["pet"]["getAllOwn"][number];

export default async function ProfilePetsPage({
  params,
}: {
  params: Promise<{ petId: string }>;
}) {
  const { petId } = await params;
  const pet = await api.private.pet.getOwnOneById({ petId });

  const { appointments, appointmentsCount } =
    await api.private.appointments.getAll({ petId });

  if (!pet) return notFound();
  return (
    <div className="flex flex-col gap-y-4">
      <div className="-mt-2">
        <BackButton />
      </div>
      <PetCard key={pet.id} pet={pet} />
      <AppointmentsSection
        title="Wizyty"
        appointments={appointments}
        appointmentsCount={appointmentsCount}
        emptyComponent={() => (
          <EmptyResult
            icon={CalendarIcon}
            title="Brak wizyt"
            description="Po umówieniu wizyty pojawią się one tutaj. Możesz łatwo śledzić i
              zarządzać wszystkimi swoimi wizytami w jednym miejscu."
            actionButton={
              <LinkButton
                href={`/appointments/new/?petId=${pet.id}`}
                className="mt-6 w-full"
              >
                <PlusIcon /> Umów wizytę
              </LinkButton>
            }
          />
        )}
      />
    </div>
  );
}
