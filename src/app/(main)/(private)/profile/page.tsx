import { getCurrentUser } from "@/auth/current-user";
import { notFound } from "next/navigation";
import { ProfileAppointmentsView } from "./_components/profile-appointments-view";
import { H2 } from "@/components/typography";
import { LinkButton } from "@/components/link-button";
import { api } from "@/trpc/server";
import { EmptyAppointments } from "./_components/empty-appointment";

const MIN_APPPOINTMENTS_TO_SHOW = 3;

export default async function ProfilePage() {
  const user = await getCurrentUser({
    redirectIfNotFound: true,
  });

  if (!user.roles.includes("CLIENT") && !user.roles.includes("ADMIN"))
    return notFound();

  const {
    appointments: activeAppointments,
    appointmentsCount: activeAppointmentsCount,
  } = await api.private.appointments.getAllActive({
    take: MIN_APPPOINTMENTS_TO_SHOW,
  });

  if (activeAppointmentsCount === 0) {
    return <EmptyAppointments message="Brak aktywnych wizyt" />;
  }

  return (
    <div className="max-w-3xl">
      <H2 className="text-muted-foreground my-4 !text-start text-lg md:!text-xl">
        Moje aktywne wizyty
      </H2>
      {activeAppointmentsCount === 0 ? (
        <EmptyAppointments />
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
