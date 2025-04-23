import { ProfileAppointmentsView } from "./_components/profile-appointments-view";
import { H2 } from "@/components/typography";
import { LinkButton } from "@/components/link-button";
import { api } from "@/trpc/server";
import { EmptyResult } from "@/components/empty-result";
import { Calendar, Clock, Plus } from "lucide-react";
import type { RouterOutputs } from "@/trpc/react";

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
    <div className="space-y-4">
      <AppointmentsSection
        title="Aktywne wizyty"
        moreHref="/profile/appointments"
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
        moreHref="/profile/appointments"
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

function AppointmentsSection({
  appointments,
  appointmentsCount,
  title,
  moreHref,
  emptyComponent: EmptyComponent,
}: {
  appointments: RouterOutputs["private"]["appointments"]["getAll"]["appointments"];
  appointmentsCount: number;
  title: string;
  moreHref: string;
  emptyComponent: React.ElementType;
}) {
  const isEmpty = appointmentsCount === 0;
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <H2 className="text-muted-foreground my-4 !text-start text-lg md:!text-xl">
          {title} ({appointmentsCount})
        </H2>
        {!isEmpty && (
          <LinkButton href={moreHref} variant="link" size="sm">
            Zobacz wszystkie
          </LinkButton>
        )}
      </div>

      {!isEmpty ? (
        <ProfileAppointmentsView appointments={appointments} />
      ) : (
        <EmptyComponent />
      )}
    </div>
  );
}
