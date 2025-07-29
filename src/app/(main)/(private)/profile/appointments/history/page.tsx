import { api } from "@/trpc/server";
import { AppointmentsSection } from "../../_components/appointments/appointments-section";
import { EmptyResult } from "@/components/empty-result";
import { Clock, Plus } from "lucide-react";
import { LinkButton } from "@/components/link-button";
import Pagination from "@/components/pagination";
import { Suspense } from "react";
import { AppointmentSectionSkeleton } from "../../_components/skeletons/appointment-skeletons";

const APPOINTMENTS_PER_PAGE = 9;

export default async function HistoryAppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  const pageNumber = parseInt(page) || 1;

  return (
    <div>
      <Suspense
        fallback={
          <AppointmentSectionSkeleton
            appointmentsToShow={APPOINTMENTS_PER_PAGE}
          />
        }
      >
        <FinishedAppointmentsSection pageNumber={pageNumber} />
      </Suspense>
    </div>
  );
}

async function FinishedAppointmentsSection({
  pageNumber,
}: {
  pageNumber: number;
}) {
  const {
    appointments: finishedAppointments,
    appointmentsCount: finishedAppointmentsCount,
  } = await api.private.appointments.getAllHistory({
    take: APPOINTMENTS_PER_PAGE,
    skip: (pageNumber - 1) * APPOINTMENTS_PER_PAGE,
    orderBy: "startTime",
    order: "desc",
  });
  return (
    <>
      <AppointmentsSection
        title="Twoja historia wizyt"
        appointments={finishedAppointments}
        appointmentsCount={finishedAppointmentsCount}
        emptyComponent={() => (
          <EmptyResult
            icon={Clock}
            title="Brak wczeszniejszych wizyt"
            description="Tutaj znajdziesz swoje wszystkie poprzednie wizyty."
            actionButton={
              <LinkButton href="/appointments/new" className="mt-6 w-full">
                <Plus /> Umów wizytę
              </LinkButton>
            }
          />
        )}
      />
      {finishedAppointmentsCount / APPOINTMENTS_PER_PAGE > 1 && (
        <div className="my-8 flex justify-center md:justify-end">
          <Pagination
            totalPages={Math.ceil(
              finishedAppointmentsCount / APPOINTMENTS_PER_PAGE,
            )}
          />
        </div>
      )}
    </>
  );
}
