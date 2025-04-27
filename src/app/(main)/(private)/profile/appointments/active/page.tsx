import { api } from "@/trpc/server";
import { AppointmentsSection } from "../../_components/appointments/appointments-section";
import { EmptyResult } from "@/components/empty-result";
import { Calendar, Plus } from "lucide-react";
import { LinkButton } from "@/components/link-button";
import Pagination from "@/components/pagination";

const APPOINTMENTS_PER_PAGE = 9;

export default async function ActiveAppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  const pageNumber = parseInt(page) || 1;

  const {
    appointments: activeAppointments,
    appointmentsCount: activeAppointmentsCount,
  } = await api.private.appointments.getAllActive({
    take: APPOINTMENTS_PER_PAGE,
    skip: (pageNumber - 1) * APPOINTMENTS_PER_PAGE,
    orderBy: "startTime",
    order: "asc",
  });

  return (
    <div>
      <AppointmentsSection
        title="Twoje zaplanowane wizyty"
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
      {activeAppointmentsCount / APPOINTMENTS_PER_PAGE > 1 && (
        <div className="my-8 flex justify-center md:justify-end">
          <Pagination
            totalPages={Math.ceil(
              activeAppointmentsCount / APPOINTMENTS_PER_PAGE,
            )}
          />
        </div>
      )}
    </div>
  );
}
