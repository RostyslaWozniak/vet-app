"use client";

import LoadingButton from "@/components/loading-button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type DeleteServiceButtonProps = {
  id: string;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DeleteServiceButton({
  id,
  setIsDeleteOpen,
}: DeleteServiceButtonProps) {
  const router = useRouter();
  const { mutate: deleteProduct, isPending: isDeleting } =
    api.admin.services.delete.useMutation({
      onSuccess: () => {
        setIsDeleteOpen(false);
        toast.success("Product deleted successfully");
        router.refresh();
      },
      onError: () => {
        setIsDeleteOpen(false);
        toast.error("Product deletion failed");
      },
    });

  const handleDeleteProduct = () => {
    deleteProduct({ id });
  };
  return (
    <LoadingButton
      variant="destructive"
      className="self-end"
      onClick={handleDeleteProduct}
      loading={isDeleting}
    >
      Delete
    </LoadingButton>
  );
}
