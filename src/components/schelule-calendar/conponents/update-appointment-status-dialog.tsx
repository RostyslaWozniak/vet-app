"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function UpdateAppointmentStatusDialog({
  appointmentId,
  status,
}: {
  appointmentId: string;
  status: "CONFIRMED" | "COMPLETED";
}) {
  const router = useRouter();
  const isConfirmOperation = status === "CONFIRMED";

  const [isOpen, setIsOpen] = useState(false);
  const { mutate: updateAppointment, isPending: isAppointmentUpdating } =
    api.vet.appointments.updateStatus.useMutation({
      onSuccess: () => {
        toast.success(
          isConfirmOperation
            ? "Wizyta została zatwierdzona"
            : "Wizyta została zakończona",
        );
        setIsOpen(false);
        router.refresh();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return (
    <>
      <DialogWrapper
        title={
          isConfirmOperation ? "Zatwierdzenie wizyty" : "Zakonczenie wizyty"
        }
        description={
          isConfirmOperation
            ? "Czy napewno chcesz zatwierdzić wizytę? Ta operacja nie będzie mogła być odwrócona!"
            : "Czy napewno chcesz zakończyć wizytę? Ta operacja nie będzie mogła być odwrócona!"
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="scrollbar-hide flex max-h-[90vh] w-120 flex-row-reverse gap-3"
        overflowYScroll
        closeButton="Cofnij"
        closeButtonVariant={{ variant: "outline", size: "default" }}
      >
        <LoadingButton
          loading={isAppointmentUpdating}
          className={cn({
            "bg-confirmed": isConfirmOperation,
            "bg-completed": !isConfirmOperation,
          })}
          onClick={() => {
            updateAppointment({
              appointmentId,
              status,
            });
          }}
        >
          {isConfirmOperation ? "Zatwierdź wizytę" : "Zakończ wizytę"}
        </LoadingButton>
      </DialogWrapper>
      <Button
        className={cn("w-full", {
          "bg-confirmed": isConfirmOperation,
          "bg-completed": !isConfirmOperation,
        })}
        onClick={() => setIsOpen(true)}
      >
        {isConfirmOperation ? "Zatwierdź" : "Zakończ"}
      </Button>
    </>
  );
}
