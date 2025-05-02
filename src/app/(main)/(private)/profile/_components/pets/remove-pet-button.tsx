"use client";

import LoadingButton from "@/components/loading-button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RemovePetButtonProps = {
  petId: string;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function RemovePetButton({
  petId,
  setIsDeleteOpen,
}: RemovePetButtonProps) {
  const router = useRouter();

  const { mutate: removePet, isPending: isRemoving } =
    api.private.pet.remove.useMutation({
      onSuccess: () => {
        toast.success("Zwirzaka usunięto");
        setIsDeleteOpen(false);
        router.push("/profile");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  function handleRemovePet() {
    removePet({ petId });
  }
  return (
    <LoadingButton
      loading={isRemoving}
      onClick={handleRemovePet}
      variant="destructive"
    >
      Usuń zwierzaka
    </LoadingButton>
  );
}
