import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionHeadingSubtitle } from "@/components/sections/components/section-heading-subtitle";
import { ProfileAppointmentsView } from "../_components/profile-appointments-view";
import { api } from "@/trpc/server";
import { EmptyAppointments } from "../_components/empty-appointment";
import type { $Enums } from "@prisma/client";
import { mapAppointmentStatus } from "@/lib/map-appointment-status";

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
            <EmptyAppointments />
          ) : appointments.length === 0 ? (
            <EmptyAppointments
              message={`Brak wizyt ze statusem ${mapAppointmentStatus(status as $Enums.AppointmentStatus).label}`}
            />
          ) : (
            <ProfileAppointmentsView appointments={appointments} />
          )}
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
