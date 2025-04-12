import type { UserAppointment } from "../appointments/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";

export function AppointmentView({
  appointments,
}: {
  appointments: UserAppointment[];
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {appointments.length > 0 ? (
            appointments
              .filter((a) => a.startTime > new Date())
              .map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  statusColor={getStatusColor}
                />
              ))
          ) : (
            <EmptyAppointments />
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {appointments.length > 0 ? (
            appointments
              .filter((a) => a.startTime < new Date())
              .map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  statusColor={getStatusColor}
                />
              ))
          ) : (
            <EmptyAppointments />
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                statusColor={getStatusColor}
              />
            ))
          ) : (
            <EmptyAppointments />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

const getStatusColor = (status: UserAppointment["status"]) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-800 hover:bg-green-100/80";
    case "CANCELLED":
      return "bg-red-100 text-red-800 hover:bg-red-100/80";
    case "COMPLETED":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
  }
};

function AppointmentCard({
  appointment,
  statusColor,
}: {
  appointment: UserAppointment;
  statusColor: (status: UserAppointment["status"]) => string;
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{appointment.service.name}</CardTitle>
            <CardDescription className="mt-1">
              {appointment.service.description ?? "No description available"}
            </CardDescription>
          </div>
          <Badge className={cn("ml-2", statusColor(appointment.status))}>
            {appointment.status.charAt(0) +
              appointment.status.slice(1).toLowerCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <User className="text-muted-foreground h-4 w-4" />
            <span className="text-sm">{appointment.vetSchedule.user.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-muted-foreground h-4 w-4" />
            <span className="text-sm">
              {appointment.service.durationInMinutes} minutes
            </span>
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span className="text-sm">
              {format(appointment.startTime, "EEEE, MMMM d, yyyy 'at' h:mm a")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyAppointments({
  message = "No appointments found.",
}: {
  message?: string;
}) {
  return (
    <div className="bg-muted/30 flex flex-col items-center justify-center rounded-lg border border-dashed px-4 py-12">
      <Calendar className="text-muted-foreground mb-4 h-12 w-12" />
      <h3 className="mb-1 text-lg font-medium">{message}</h3>
      <p className="text-muted-foreground max-w-md text-center text-sm">
        When you schedule appointments, they will appear here. You can easily
        track and manage all your appointments in one place.
      </p>
    </div>
  );
}
