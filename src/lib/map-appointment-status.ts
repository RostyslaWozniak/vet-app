import type { $Enums } from "@prisma/client";

export function mapAppointmentStatus(status: $Enums.AppointmentStatus) {
  switch (status) {
    case "COMPLETED":
      return {
        color: {
          default: "bg-completed text-primary-foreground font-semibold ",
          secondary:
            "bg-completed/5 text-completed font-semibold border-completed",
        },
        label: "Zakończona",
      };
    case "PENDING":
      return {
        color: {
          default: "bg-pending text-primary-foreground font-semibold",
          secondary: "bg-pending/5 text-pending font-semibold border-pending",
        },
        label: "Oczekuje",
      };
    case "CONFIRMED":
      return {
        color: {
          default: "bg-confirmed text-primary-foreground font-semibold",
          secondary:
            "bg-confirmed/5 text-confirmed font-semibold border-confirmed",
        },

        label: "Potwierdzona",
      };
    case "CANCELLED":
      return {
        color: {
          default: "bg-cancelled text-primary-foreground font-semibold",
          secondary:
            "bg-cancelled/5 text-cancelled font-semibold border-cancelled",
        },
        label: "Anulowana",
      };
    default:
      return status;
  }
}
