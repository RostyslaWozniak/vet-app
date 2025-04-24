import { LinkButton } from "@/components/link-button";
import { H2 } from "@/components/typography";
import type { RouterOutputs } from "@/trpc/react";
import { ProfileAppointmentsView } from "./profile-appointments-view";

export function AppointmentsSection({
  appointments,
  appointmentsCount,
  title,
  emptyComponent: EmptyComponent,
  moreHref,
}: {
  appointments: RouterOutputs["private"]["appointments"]["getAll"]["appointments"];
  appointmentsCount: number;
  title: string;
  emptyComponent: React.ElementType;
  moreHref?: string;
}) {
  const isEmpty = appointmentsCount === 0;
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <H2 className="text-muted-foreground my-4 !text-start text-base md:!text-xl">
          {title} ({appointmentsCount})
        </H2>
        {moreHref && !isEmpty && (
          <LinkButton
            href={moreHref}
            variant="link"
            size="sm"
            className="text-xs sm:text-sm"
          >
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
