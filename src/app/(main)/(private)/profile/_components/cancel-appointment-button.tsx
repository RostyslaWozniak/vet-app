"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function CancelAppointmentButton({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const router = useRouter();

  const { mutate: cancel, isPending: isCanceling } =
    api.private.appointments.cancel.useMutation({
      onSuccess: () => {
        toast.success("Wizyta została odwołana");
        setIsCancelOpen(false);
        router.refresh();
      },
      onError: () => {
        toast.error("Coś poszło nie tak. Spróbuj ponownie!");
        setIsCancelOpen(false);
      },
    });
  return (
    <>
      <DialogWrapper
        title="Anuluj wizytę"
        description="Czy na pewno chcesz anulować wizytę? Tej czynności nie można cofnąć."
        isOpen={isCancelOpen}
        setIsOpen={setIsCancelOpen}
        className="flex w-[500px] flex-row-reverse justify-start gap-3"
        closeButton="Cofnij"
        closeButtonVariant={{ variant: "outline", size: "default" }}
      >
        <LoadingButton
          loading={isCanceling}
          onClick={() => cancel({ appointmentId })}
          variant="destructive"
        >
          Potwierdzm anulowanie wizyty
        </LoadingButton>
      </DialogWrapper>
      <Button
        onClick={() => setIsCancelOpen((prev) => !prev)}
        variant="destructive"
        size="sm"
        className="right-2 bottom-2 h-8 w-full text-xs sm:w-auto md:absolute"
      >
        Anuluj wizytę
      </Button>
    </>
  );
}
