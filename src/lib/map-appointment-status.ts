import type { $Enums } from "@prisma/client";

export function mapAppointmentStatus(status: $Enums.AppointmentStatus) {
  switch (status) {
    case "COMPLETED":
      return {
        color: "bg-completed/5 text-completed font-semibold border-completed",
        label: "Zakończone",
      };
    case "PENDING":
      return {
        color: "bg-pending/5 text-pending font-semibold border-pending",
        label: "Oczekuje",
      };
    case "CONFIRMED":
      return {
        color: "bg-confirmed/5 text-confirmed font-semibold border-confirmed",
        label: "Potwierdzone",
      };
    case "CANCELLED":
      return {
        color: "bg-cancelled/5 text-cancelled font-semibold border-cancelled",
        label: "Anulowane",
      };
    default:
      return status;
  }
}
