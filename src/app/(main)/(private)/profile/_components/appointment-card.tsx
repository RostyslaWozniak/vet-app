import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { RouterOutputs } from "@/trpc/react";
import { CancelAppointmentButton } from "./cancel-appointment-button";
import { pl } from "date-fns/locale";
import { formatTimeRange } from "@/components/schelule-calendar/utils/helpers";
import { LinkButton } from "@/components/link-button";
import { mapAppointmentStatus } from "@/lib/map-appointment-status";
import type { $Enums } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export function AppointmentCard({
  appointment,
}: {
  appointment: RouterOutputs["private"]["appointments"]["getAll"]["appointments"][0];
}) {
  const startDate = new Date(appointment.startTime);
  const endDate = new Date(appointment.endTime);
  const isPastAppointment = new Date() > endDate;
  const canCancel =
    !isPastAppointment &&
    (appointment.status === "PENDING" || appointment.status === "CONFIRMED");
  return (
    <Card>
      <CardContent className="flex">
        <div className="flex-grow">
          <CardTitle className="flex-grow text-xl">
            {appointment.service.name}
          </CardTitle>
          <div className="text-foreground text-sm">
            Weterynarz:{" "}
            <span className="font-semibold">
              {appointment.vetSchedule.user.name}
            </span>
          </div>
        </div>
        <div>{getStatusBadge(appointment.status)}</div>
      </CardContent>
      <CardFooter className="items-end">
        <div className="flex-grow space-y-1">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {format(startDate, "eee d MMMM", { locale: pl })}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {formatTimeRange(
              new Date(appointment.startTime),
              new Date(appointment.endTime),
            )}
          </div>
        </div>
        <div className="h-full">
          {canCancel ? (
            <CancelAppointmentButton appointmentId={appointment.id} />
          ) : (
            <div className="text-muted-foreground text-center text-xs">
              {isPastAppointment ? (
                <LinkButton
                  href={`/appointments/new/${appointment.service.id}`}
                  size="sm"
                  className="w-full"
                >
                  Umów ponownie
                </LinkButton>
              ) : null}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

const getStatusBadge = (status: $Enums.AppointmentStatus) => {
  const { color, label } = mapAppointmentStatus(status);
  return (
    <Badge variant="outline" className={cn("", color.secondary)}>
      {label}
    </Badge>
  );
};
