import { getCurrentUser } from "@/auth/current-user";
import { db } from "@/server/db";
import type { $Enums } from "@prisma/client";
import { AppointmentView } from "../_components/appointment-view";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionHeadingSubtitle } from "@/components/sections/components/section-heading-subtitle";

export type UserAppointment = {
  vetSchedule: {
    user: {
      name: string;
    };
  };
  service: {
    description: string | null;
    name: string;
    durationInMinutes: number;
  };
  id: string;
  status: $Enums.AppointmentStatus;
  startTime: Date;
};

export default async function AppointmentsPage() {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  const appointments: UserAppointment[] = await db.appointment.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      status: true,
      startTime: true,
      service: {
        select: {
          name: true,
          description: true,
          durationInMinutes: true,
        },
      },
      vetSchedule: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return (
    <div>
      <section>
        <MaxWidthWrapper>
          <SectionHeadingSubtitle
            title="Moje wizyty"
            titleClassName="sm:text-nowrap"
          />
          <AppointmentView appointments={appointments} />
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
