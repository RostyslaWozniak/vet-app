import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionHeadingSubtitle } from "@/components/sections/components/section-heading-subtitle";
import { ProfileAppointmentsView } from "../_components/profile-appointments-view";
import { api } from "@/trpc/server";
import type { $Enums } from "@prisma/client";
import { mapAppointmentStatus } from "@/lib/map-appointment-status";
import { EmptyResult } from "@/components/empty-result";
import { Calendar, Plus } from "lucide-react";
import { LinkButton } from "@/components/link-button";

export default async function ProfileAppointmentsPage() {
  const { appointments, appointmentsCount } =
    await api.private.appointments.getAll({
      take: 9,
      orderBy: "updatedAt",
      order: "desc",
    });

  return (
    <div>
      <section>
        <MaxWidthWrapper className="my-4 space-y-4">
          <SectionHeadingSubtitle
            title={`Moje wizyty (${appointmentsCount})`}
            titleClassName="sm:text-nowrap"
          />

          {appointmentsCount === 0 ? (
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
          ) : appointments.length === 0 ? (
            <EmptyResult
              icon={Calendar}
              title={`Brak wizyt ze statusem ${mapAppointmentStatus(status as $Enums.AppointmentStatus).label}`}
              description="Po umówieniu wizyty pojawią się one tutaj. Możesz łatwo śledzić i
                      zarządzać wszystkimi swoimi wizytami w jednym miejscu."
              actionButton={
                <LinkButton href="/appointments/new" className="my-4 w-full">
                  <Plus /> Umów wizytę
                </LinkButton>
              }
            />
          ) : (
            <ProfileAppointmentsView appointments={appointments} />
          )}
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
