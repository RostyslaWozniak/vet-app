"use client";

import { useState } from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Clock, Mail, Phone, User, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { $Enums } from "@prisma/client";
import type { AppointmentType } from "./types/appointment";

interface AppointmentDialogProps {
  selectedAppointment: AppointmentType | null;
  setSelectedAppointment: (appointment: AppointmentType | null) => void;
  onStatusChange?: (id: string, status: $Enums.AppointmentStatus) => void;
}

export default function AppointmentDialog({
  selectedAppointment,
  setSelectedAppointment,
  onStatusChange,
}: AppointmentDialogProps) {
  const [status, setStatus] = useState<$Enums.AppointmentStatus | null>(
    selectedAppointment?.status ?? null,
  );

  const getStatusColor = (status: $Enums.AppointmentStatus) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const handleStatusChange = (newStatus: $Enums.AppointmentStatus) => {
    setStatus(newStatus);
    if (selectedAppointment && onStatusChange) {
      onStatusChange(selectedAppointment.id, newStatus);
    }
  };

  return (
    <Dialog
      open={!!selectedAppointment}
      onOpenChange={(open) => !open && setSelectedAppointment(null)}
    >
      {selectedAppointment && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Szczegóły wizyty
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-2">
            {/* Service and Status Section */}
            <div className="bg-card rounded-lg p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {selectedAppointment.service.name}
                </h3>
                <Badge
                  className={cn(
                    "border-none px-3 py-1",
                    getStatusColor(selectedAppointment.status),
                  )}
                >
                  {selectedAppointment.status}
                </Badge>
              </div>

              <div className="mt-2">
                <label className="text-card-foreground text-sm font-medium">
                  Zmień Status:
                </label>
                <Select
                  value={status ?? selectedAppointment.status}
                  onValueChange={(value) =>
                    handleStatusChange(value as $Enums.AppointmentStatus)
                  }
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date and Time Section */}
            <div className="bg-card space-y-3 rounded-lg p-4">
              <h4 className="text-card-foreground font-medium">Grafik</h4>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="text-card-foreground h-4 w-4" />
                <span className="font-medium">
                  {format(
                    new Date(selectedAppointment.startTime),
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
                    new Date(selectedAppointment.startTime),
                    "HH:mm",
                  )} - ${format(new Date(selectedAppointment.endTime), "HH:mm")}`}
                </span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card space-y-3 rounded-lg p-4">
              <h4 className="text-card-foreground font-medium">
                Informacje kontaktowe
              </h4>
              {selectedAppointment.contactName && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="text-card-foreground h-4 w-4" />
                  <span>{selectedAppointment.contactName}</span>
                </div>
              )}
              {selectedAppointment.contactEmail && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="text-card-foreground h-4 w-4" />
                  <span>{selectedAppointment.contactEmail}</span>
                </div>
              )}
              {selectedAppointment.contactPhone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="text-card-foreground h-4 w-4" />
                  <span>{selectedAppointment.contactPhone}</span>
                </div>
              )}
            </div>

            <Separator />

            {/* Footer with creation date */}
            <div className="text-muted-foreground text-center text-xs">
              <span>Stworzono: </span>
              {format(new Date(selectedAppointment.createdAt), "MMM d, yyyy", {
                locale: pl,
              })}
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
