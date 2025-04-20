import { ProfileAppointmentsView } from "./_components/profile-appointments-view";
import { H2 } from "@/components/typography";
import { LinkButton } from "@/components/link-button";
import { api } from "@/trpc/server";
import { EmptyResult } from "@/components/empty-result";
import { Calendar, Plus } from "lucide-react";

const MIN_APPPOINTMENTS_TO_SHOW = 3;

export default async function ProfilePage() {
  const {
    appointments: activeAppointments,
    appointmentsCount: activeAppointmentsCount,
  } = await api.private.appointments.getAllActive({
    take: MIN_APPPOINTMENTS_TO_SHOW,
  });

  if (activeAppointmentsCount === 0) {
    return (
      <EmptyResult
        icon={Calendar}
        title="Brak aktywnych wizyt"
        description="Po umówieniu wizyty pojawią się one tutaj. Możesz łatwo śledzić i
        zarządzać wszystkimi swoimi wizytami w jednym miejscu."
        actionButton={
          <LinkButton href="/appointments/new" className="my-4 w-full">
            <Plus /> Umów wizytę
          </LinkButton>
        }
      />
    );
  }

  return (
    <div className="max-w-3xl">
      <H2 className="text-muted-foreground my-4 !text-start text-lg md:!text-xl">
        Moje aktywne wizyty
      </H2>
      {activeAppointmentsCount === 0 ? (
        <EmptyResult
          icon={Calendar}
          title="Jeszcze nie masz żadnych wizyt"
          description="Po umówieniu wizyty pojawią się one tutaj. Możesz łatwo śledzić i
        zarządzać wszystkimi swoimi wizytami w jednym miejscu."
          actionButton={
            <LinkButton href="/appointments/new" className="my-4 w-full">
              <Plus /> Umów wizytę
            </LinkButton>
          }
        />
      ) : (
        <ProfileAppointmentsView appointments={activeAppointments} />
      )}

      {activeAppointmentsCount > activeAppointments.length && (
        <LinkButton href="/profile/appointments" className="my-4 w-full">
          Zobacz wszystkie wizyty
        </LinkButton>
      )}
    </div>
  );
}
