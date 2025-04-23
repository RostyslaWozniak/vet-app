import { LinkButton } from "@/components/link-button";
import { api } from "@/trpc/server";
import { EmptyResult } from "@/components/empty-result";
import { Calendar, Clock, Plus } from "lucide-react";
import { AppointmentsSection } from "./_components/appointments-section";

const MIN_APPPOINTMENTS_TO_SHOW = 1;

export default async function ProfilePage() {
  const {
    appointments: activeAppointments,
    appointmentsCount: activeAppointmentsCount,
  } = await api.private.appointments.getAllActive({
    take: MIN_APPPOINTMENTS_TO_SHOW,
    orderBy: "startTime",
    order: "asc",
  });
  const {
    appointments: finishedAppointments,
    appointmentsCount: finishedAppointmentsCount,
  } = await api.private.appointments.getAllFinished({
    take: MIN_APPPOINTMENTS_TO_SHOW,
    orderBy: "startTime",
    order: "desc",
  });

  return (
    <div className="space-y-8">
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
    </div>
  );
}
