import { LinkButton } from "@/components/link-button";
import { api } from "@/trpc/server";
import { EmptyResult } from "@/components/empty-result";
import { Calendar, Clock, Plus } from "lucide-react";
import { AppointmentsSection } from "./_components/appointments/appointments-section";
import { PetsSection } from "./_components/pets/pets-section";
import { db } from "@/server/db";
import { getCurrentUser } from "@/auth/current-user";
import { ProfileHeader } from "./_components/profile-header";
import { Suspense } from "react";
import { wait } from "@/lib/utils";
import { AppointmentSectionSkeleton } from "./_components/skeletons/appointment-skeletons";
import { PetsSectionSkeleton } from "@/features/pets/components/skeletons";

const MIN_APPPOINTMENTS_TO_SHOW = 1;

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<div>ProfileHeader...</div>}>
        <ProfileHeader />
      </Suspense>
      <Suspense fallback={<PetsSectionSkeleton />}>
        <PetsSectionWrapper />
      </Suspense>

      <Suspense
        fallback={
          <AppointmentSectionSkeleton
            appointmentsToShow={MIN_APPPOINTMENTS_TO_SHOW}
          />
        }
      >
        <ActiveAppointmentsSection />
      </Suspense>

      <Suspense
        fallback={
          <AppointmentSectionSkeleton
            appointmentsToShow={MIN_APPPOINTMENTS_TO_SHOW}
          />
        }
      >
        <FinishedAppointmentsSection />
      </Suspense>
    </div>
  );
}

async function PetsSectionWrapper() {
  const user = await getCurrentUser({ redirectIfNotFound: true });
  const pets = await db.pet.findMany({
    where: {
      userId: user.id,
    },
  });
  return <PetsSection pets={pets} />;
}

async function ActiveAppointmentsSection() {
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
          icon={Calendar}
          title="Brak nadchodzących wizyt"
          description="Po umówieniu wizyty pojawią się one tutaj. Możesz łatwo śledzić i
        zarządzać wszystkimi swoimi wizytami w jednym miejscu."
          actionButton={
            <LinkButton href="/appointments/new" className="mt-6 w-full">
              <Plus /> Umów wizytę
            </LinkButton>
          }
        />
      )}
    />
  );
}
async function FinishedAppointmentsSection() {
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
          icon={Clock}
          title="Brak wczeszniejszych wizyt"
          description="Tutaj znajdziesz swoje zakończone wizyty."
          actionButton={
            <LinkButton href="/appointments/new" className="mt-6 w-full">
              <Plus /> Umów wizytę
            </LinkButton>
          }
        />
      )}
    />
  );
}
