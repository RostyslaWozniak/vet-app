"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import type { AppointmentType } from "../types/appointment";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar, Clock, Mail, Phone, User } from "lucide-react";
import { UpdateAppointmentStatusDialog } from "./update-appointment-status-dialog";
import { CancelAppointmentDialog } from "./cancel-appointment-dialog";
import { cn } from "@/lib/utils";
import { useSession } from "@/app/session-provider";
import { mapAppointmentStatus } from "@/lib/map-appointment-status";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/link-button";

export function AppointmentDialog({
  children,
  appointment,
}: {
  children: ReactNode;
  appointment: AppointmentType;
}) {
  const { user } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = user.roles.includes("ADMIN") && pathname.startsWith("/admin");
  const isVet = user.roles.includes("VET") && pathname.startsWith("/vet");

  const status = mapAppointmentStatus(appointment.status);

  return (
    <>
      <DialogWrapper
        title=" Szczegóły wizyty"
        description="Czy napewno chcesz anulować wizytę? Ta operacja nie będzie mogła być odwrócona!"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="scrollbar-hide flex max-h-[90vh] w-200 gap-3"
        overflowYScroll
      >
        <div className="w-full space-y-6 pt-2">
          <Badge
            className={cn(
              "absolute top-12 right-4 border-none px-3 py-1",
              status.color,
            )}
          >
            {status.label}
          </Badge>
          <div className="grid grid-cols-3 gap-x-4">
            {/* Service and Status Section */}
            <div className="bg-card flex flex-col rounded-lg p-4">
              <h3 className="text-lg font-semibold">
                {appointment.service.name}
              </h3>
              <div className="flex flex-grow items-end">
                {isAdmin &&
                  appointment.status !== "CANCELLED" &&
                  appointment.status !== "COMPLETED" && (
                    <CancelAppointmentDialog
                      appointmentId={appointment.id}
                      setIsAppointmentDialogOpen={setIsOpen}
                    />
                  )}
                {isVet &&
                  appointment.status !== "CANCELLED" &&
                  appointment.status !== "COMPLETED" && (
                    <UpdateAppointmentStatusDialog
                      setIsAppointmentDialogOpen={setIsOpen}
                      appointmentId={appointment.id}
                      status={
                        appointment.status === "PENDING"
                          ? "CONFIRMED"
                          : "COMPLETED"
                      }
                    />
                  )}
              </div>
            </div>

            {/* Date and Time Section */}
            <div className="bg-card space-y-3 rounded-lg p-4">
              <h4 className="text-card-foreground font-medium">Grafik</h4>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="text-card-foreground h-4 w-4" />
                <span className="font-medium">
                  {format(
                    new Date(appointment.startTime),
                    "EEEE, d MMMM , yyyy",
                    {
                      locale: pl,
                    },
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="text-card-foreground h-4 w-4" />
                <span>
                  {`${format(
                    new Date(appointment.startTime),
                    "HH:mm",
                  )} - ${format(new Date(appointment.endTime), "HH:mm")}`}
                </span>
              </div>
            </div>
            {/* Contact Information */}
            <div className="bg-card space-y-3 rounded-lg p-4">
              <h4 className="text-card-foreground font-medium">
                Informacje kontaktowe
              </h4>
              {appointment.contactName && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="text-card-foreground h-4 w-4" />
                  <span>{appointment.contactName}</span>
                </div>
              )}
              {appointment.contactEmail && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="text-card-foreground h-4 w-4" />
                  <span>{appointment.contactEmail}</span>
                </div>
              )}
              {appointment.contactPhone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="text-card-foreground h-4 w-4" />
                  <span>{appointment.contactPhone}</span>
                </div>
              )}
              <LinkButton
                href={`/vet/appointments/${appointment.userId}`}
                variant="link"
              >
                Przejdź do klienta
              </LinkButton>
            </div>
          </div>

          <Separator />

          {/* Footer with creation date */}
          <div className="text-muted-foreground text-center text-xs">
            <span>Stworzono: </span>
            {format(new Date(appointment.createdAt), "MMM d, yyyy", {
              locale: pl,
            })}
          </div>
        </div>
      </DialogWrapper>
      <div onClick={() => setIsOpen(true)}>{children}</div>
    </>
  );
}

// import { format } from "date-fns";
// import { pl } from "date-fns/locale";
// import { Clock, Mail, Phone, User, Calendar } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import type { $Enums } from "@prisma/client";
// import type { AppointmentType } from "../types/appointment";
// import { api } from "@/trpc/react";
// import { usePathname } from "next/navigation";
// import { CancelAppointmentDialog } from "./cancel-appointment-dialog";
// import { mapAppointmentStatus } from "@/lib/map-appointment-status";
// import { UpdateAppointmentStatusDialog } from "./update-appointment-status-dialog";

// interface AppointmentDialogProps {
//   selectedAppointment: AppointmentType | null;
//   setSelectedAppointment: (appointment: AppointmentType | null) => void;
//   onStatusChange?: (id: string, status: $Enums.AppointmentStatus) => void;
// }

// export default function AppointmentDialog({
//   selectedAppointment,
//   setSelectedAppointment,
// }: AppointmentDialogProps) {
//   const user = api.public.user.getCurrentUser.useQuery();
//   const pathname = usePathname();

// const isAdmin =
//   user.data?.roles.includes("ADMIN") && pathname.startsWith("/admin");
// const isVet = user.data?.roles.includes("VET") && pathname.startsWith("/vet");

// const status = mapAppointmentStatus(selectedAppointment?.status ?? "PENDING");

//   return (
//     <Dialog
//       open={!!selectedAppointment}
//       onOpenChange={(open) => !open && setSelectedAppointment(null)}
//     >
//       {selectedAppointment && (
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-bold">
//               Szczegóły wizyty
//             </DialogTitle>
//           </DialogHeader>

// <div className="space-y-6 pt-2">
//   {/* Service and Status Section */}
//   <div className="bg-card rounded-lg p-4">
//     <div className="mb-3 flex items-center justify-between">
//       <h3 className="text-lg font-semibold">
//         {selectedAppointment.service.name}
//       </h3>
//       <Badge className={cn("border-none px-3 py-1", status.color)}>
//         {status.label}
//       </Badge>
//     </div>
//     {isAdmin &&
//       selectedAppointment.status !== "CANCELLED" &&
//       selectedAppointment.status !== "COMPLETED" && (
//         <CancelAppointmentDialog
//           appointmentId={selectedAppointment.id}
//         />
//       )}
//     {isVet &&
//       selectedAppointment.status !== "CANCELLED" &&
//       selectedAppointment.status !== "COMPLETED" && (
//         <UpdateAppointmentStatusDialog
//           appointmentId={selectedAppointment.id}
//           status={
//             selectedAppointment.status === "PENDING"
//               ? "CONFIRMED"
//               : "COMPLETED"
//           }
//         />
//       )}
//   </div>

//   {/* Date and Time Section */}
//   <div className="bg-card space-y-3 rounded-lg p-4">
//     <h4 className="text-card-foreground font-medium">Grafik</h4>
//     <div className="flex items-center gap-2 text-sm">
//       <Calendar className="text-card-foreground h-4 w-4" />
//       <span className="font-medium">
//         {format(
//           new Date(selectedAppointment.startTime),
//           "EEEE, d MMMM , yyyy",
//           {
//             locale: pl,
//           },
//         )}
//       </span>
//     </div>
//     <div className="flex items-center gap-2 text-sm">
//       <Clock className="text-card-foreground h-4 w-4" />
//       <span>
//         {`${format(
//           new Date(selectedAppointment.startTime),
//           "HH:mm",
//         )} - ${format(new Date(selectedAppointment.endTime), "HH:mm")}`}
//       </span>
//     </div>
//   </div>

//   {/* Contact Information */}
//   <div className="bg-card space-y-3 rounded-lg p-4">
//     <h4 className="text-card-foreground font-medium">
//       Informacje kontaktowe
//     </h4>
//     {selectedAppointment.contactName && (
//       <div className="flex items-center gap-2 text-sm">
//         <User className="text-card-foreground h-4 w-4" />
//         <span>{selectedAppointment.contactName}</span>
//       </div>
//     )}
//     {selectedAppointment.contactEmail && (
//       <div className="flex items-center gap-2 text-sm">
//         <Mail className="text-card-foreground h-4 w-4" />
//         <span>{selectedAppointment.contactEmail}</span>
//       </div>
//     )}
//     {selectedAppointment.contactPhone && (
//       <div className="flex items-center gap-2 text-sm">
//         <Phone className="text-card-foreground h-4 w-4" />
//         <span>{selectedAppointment.contactPhone}</span>
//       </div>
//     )}
//   </div>

//   <Separator />

//   {/* Footer with creation date */}
//   <div className="text-muted-foreground text-center text-xs">
//     <span>Stworzono: </span>
//     {format(new Date(selectedAppointment.createdAt), "MMM d, yyyy", {
//       locale: pl,
//     })}
//   </div>
// </div>
//         </DialogContent>
//       )}
//     </Dialog>
//   );
// }
