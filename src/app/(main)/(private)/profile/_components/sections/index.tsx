import { PetsSection } from "../pets/pets-section";
import { api } from "@/trpc/server";
import { AppointmentsSection } from "../appointments/appointments-section";
import { CalendarIcon, ClockIcon, PlusIcon } from "lucide-react";
import { LinkButton } from "@/components/link-button";
import { EmptyResult } from "@/components/empty-result";

export const MIN_APPPOINTMENTS_TO_SHOW = 1;

export async function PetsSectionWrapper() {
  const pets = await api.private.pet.getAllOwn();
  return <PetsSection pets={pets} />;
}

export async function ActiveAppointmentsSection() {
  const {
    appointments: activeAppointments,
    appointmentsCount: activeAppointmentsCount,
  } = await api.private.appointments.getAllActive({
    take: MIN_APPPOINTMENTS_TO_SHOW,
    orderBy: "startTime",
    order: "asc",
  });
  return (
    <AppointmentsSection
      title="Zaplanowane wizyty"
      moreHref="/profile/appointments/active"
      appointments={activeAppointments}
      appointmentsCount={activeAppointmentsCount}
      emptyComponent={() => (
        <EmptyResult
          icon={CalendarIcon}
          title="Brak nadchodzących wizyt"
          description="Po umówieniu wizyty pojawią się one tutaj. Możesz łatwo śledzić i
        zarządzać wszystkimi swoimi wizytami w jednym miejscu."
          actionButton={
            <LinkButton href="/appointments/new" className="mt-6 w-full">
              <PlusIcon /> Umów wizytę
            </LinkButton>
          }
        />
      )}
    />
  );
}
export async function FinishedAppointmentsSection() {
  const {
    appointments: finishedAppointments,
    appointmentsCount: finishedAppointmentsCount,
  } = await api.private.appointments.getAllFinished({
    take: MIN_APPPOINTMENTS_TO_SHOW,
    orderBy: "startTime",
    order: "desc",
  });
  return (
    <AppointmentsSection
      title="Zakończone wizyty"
      moreHref="/profile/appointments/finished"
      appointments={finishedAppointments}
      appointmentsCount={finishedAppointmentsCount}
      emptyComponent={() => (
        <EmptyResult
          icon={ClockIcon}
          title="Brak wczeszniejszych wizyt"
          description="Tutaj znajdziesz swoje zakończone wizyty."
          actionButton={
            <LinkButton href="/appointments/new" className="mt-6 w-full">
              <PlusIcon /> Umów wizytę
            </LinkButton>
          }
        />
      )}
    />
  );
}
