import type { RouterOutputs } from "@/trpc/react";
import { AppointmentCard } from "./appointment-card";

export function ProfileAppointmentsView({
  appointments,
}: {
  appointments: RouterOutputs["private"]["appointments"]["getAll"]["appointments"];
}) {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}
