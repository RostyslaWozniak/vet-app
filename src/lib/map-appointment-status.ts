import type { $Enums } from "@prisma/client";

export function mapAppointmentStatus(status: $Enums.AppointmentStatus) {
  switch (status) {
    case "COMPLETED":
      return {
        color: "bg-completed/80 hover:bg-completed",
        label: "Zakończone",
      };
    case "PENDING":
      return { color: "bg-pending/80 hover:bg-pending", label: "Oczekuje" };
    case "CONFIRMED":
      return {
        color: "bg-confirmed/80 text-foreground hover:bg-confirmed",
        label: "Potwierdzone",
      };
    case "CANCELLED":
      return {
        color: "bg-cancelled/80 text-foreground hover:bg-cancelled",
        label: "Anulowane",
      };
    default:
      return status;
  }
}
