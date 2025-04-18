import type { $Enums } from "@prisma/client";

export function mapAppointmentStatus(status: $Enums.AppointmentStatus) {
  switch (status) {
    case "COMPLETED":
      return {
        color: "bg-completed",
        label: "Zakończone",
      };
    case "PENDING":
      return { color: "bg-pending", label: "Oczekuje" };
    case "CONFIRMED":
      return {
        color: "bg-confirmed text-foreground",
        label: "Potwierdzone",
      };
    case "CANCELLED":
      return {
        color: "bg-cancelled text-foreground",
        label: "Anulowane",
      };
    default:
      return status;
  }
}
