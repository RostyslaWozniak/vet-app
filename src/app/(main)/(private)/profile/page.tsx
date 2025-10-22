import { ProfileHeader } from "./_components/profile-header";
import { Suspense } from "react";
import { AppointmentSectionSkeleton } from "./_components/skeletons/appointment-skeletons";
import { PetsSectionSkeleton } from "@/features/pets/components/skeletons";
import {
  ActiveAppointmentsSection,
  FinishedAppointmentsSection,
  MIN_APPPOINTMENTS_TO_SHOW,
  PetsSectionWrapper,
} from "./_components/sections";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
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
