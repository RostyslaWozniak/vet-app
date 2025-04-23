"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function CancelAppointmentDialog({
  appointmentId,
  setIsAppointmentDialogOpen,
}: {
  appointmentId: string;
  setIsAppointmentDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { mutate: cancelAppointment, isPending: isAppointmentCanceling } =
    api.admin.appointments.cancel.useMutation({
      onSuccess: () => {
        toast.success("Wizyta została anulowana");
        setIsOpen(false);
        setIsAppointmentDialogOpen(false);
        router.refresh();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return (
    <>
      <DialogWrapper
        title="Anulowanie wizyty"
        description="Czy napewno chcesz anulować wizytę? Ta operacja nie będzie mogła być odwrócona!"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="scrollbar-hide flex max-h-[90vh] w-120 flex-row-reverse gap-3"
        contentClassName="overflow-y-scroll"
        closeButton="Cofnij"
        closeButtonVariant={{ variant: "outline", size: "default" }}
      >
        <LoadingButton
          loading={isAppointmentCanceling}
          variant="destructive"
          onClick={() => {
            cancelAppointment({
              appointmentId,
            });
          }}
        >
          Anuluj wizytę
        </LoadingButton>
      </DialogWrapper>
      <Button
        variant="destructive"
        className="w-full"
        onClick={() => setIsOpen(true)}
      >
        Anuluj wizytę
      </Button>
    </>
  );
}
