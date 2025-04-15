import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { RouterOutputs } from "@/trpc/react";
import { CancelAppointmentButton } from "./cancel-appointment-button";

export function ProfileAppointmentsView({
  appointments,
}: {
  appointments: RouterOutputs["private"]["appointments"]["getAll"]["appointments"];
}) {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const startDate = new Date(appointment.startTime);
        const endDate = new Date(appointment.endTime);
        const isPastAppointment = new Date() > endDate;
        const canCancel =
          !isPastAppointment &&
          (appointment.status === "PENDING" ||
            appointment.status === "CONFIRMED");

        return (
          <div
            key={appointment.id}
            className="bg-card relative flex flex-col gap-4 space-y-3 rounded-xl border p-4 md:flex-row"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="w-60 text-sm font-medium">
                  {appointment.service.name}
                </h4>
                <p className="text-muted-foreground text-xs">
                  Weterynarz:{" "}
                  <span className="font-semibold">
                    {appointment.vetSchedule.user.name}
                  </span>
                </p>
              </div>
              <div className="absolute top-2 right-2">
                {getStatusBadge(appointment.status)}
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-y-2">
              <div className="flex items-center text-xs">
                <Calendar className="mr-2 h-3 w-3" />
                {format(startDate, "MMM d, yyyy")}
              </div>
              <div className="text-muted-foreground flex items-center text-xs">
                <Clock className="mr-2 h-3 w-3" />
                {format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}
              </div>
            </div>

            {canCancel ? (
              <CancelAppointmentButton appointmentId={appointment.id} />
            ) : (
              <div className="text-muted-foreground right-2 bottom-2 py-1 text-center text-xs md:absolute">
                {isPastAppointment ? "Przeszła wizyta" : "Anulowana wizyta"}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          Oczekuje
        </Badge>
      );
    case "CONFIRMED":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          Potwierdzona
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          Odwołana
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          Zakończona
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
