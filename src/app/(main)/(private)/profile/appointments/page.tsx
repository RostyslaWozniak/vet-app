import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionHeadingSubtitle } from "@/components/sections/components/section-heading-subtitle";
import { ProfileAppointmentsView } from "../_components/profile-appointments-view";
import { api } from "@/trpc/server";
import type { $Enums } from "@prisma/client";
import { mapAppointmentStatus } from "@/lib/map-appointment-status";
import { EmptyResult } from "@/components/empty-result";
import { Calendar, Plus } from "lucide-react";
import { LinkButton } from "@/components/link-button";

const APPOINTMENTS_PER_PAGE = 20;

export default async function ProfileAppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; status: string }>;
}) {
  const { page, status } = await searchParams;

  const pageNumber = parseInt(page) || 1;
  const { appointments, appointmentsCount } =
    await api.private.appointments.getAll({
      take: APPOINTMENTS_PER_PAGE,
      skip: (pageNumber - 1) * APPOINTMENTS_PER_PAGE,
      orderBy: "startTime",
      order: "desc",
    });

  console.log(appointments);

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
              title={`Brak wizyt ze statusem ${mapAppointmentStatus(status as $Enums.AppointmentStatus)?.label}`}
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
