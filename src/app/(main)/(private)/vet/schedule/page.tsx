import { EmptyResult } from "@/components/empty-result";
import { LinkButton } from "@/components/link-button";
import { ScheduleCalendar } from "@/components/schelule-calendar";
import { getCallendarRangeHours } from "@/components/schelule-calendar/utils/helpers";
import { getWeekDateRange } from "@/lib/get-month-date-range";
import { api } from "@/trpc/server";
import { Clock } from "lucide-react";

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ year: string; week: string }>;
}) {
  const { year, week } = await searchParams;

  const { start: weekStartDate, end: weekEndDate } = getWeekDateRange(
    year,
    week,
  );

  const availabilities = await api.vet.availabilities.getAllOwn();

  const timesRange = getCallendarRangeHours(availabilities);

  return (
    <>
      {availabilities.length > 0 ? (
        <ScheduleCalendar
          weekStartDate={weekStartDate}
          weekEndDate={weekEndDate}
          availabilities={availabilities}
          timesRange={timesRange}
          vetId={undefined}
        />
      ) : (
        <EmptyResult
          title="Nie dodałeś jeszcze swojej dostępności"
          description="Aby pacjenci mogli umawiać wizyty, dodaj godziny swojej dostępności w kalendarzu."
          icon={Clock}
          className="mt-8"
          actionButton={
            <LinkButton
              href={`/vet/availability`}
              className="mt-4 w-full sm:w-auto"
            >
              Dodaj dostępność
            </LinkButton>
          }
        />
      )}
    </>
  );
}
