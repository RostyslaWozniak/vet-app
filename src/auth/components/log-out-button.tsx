"use client";

import { type ButtonProps } from "@/components/ui/button";
import { logOut } from "../actions/logout-action";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";
import { useTransition } from "react";
import { useSession } from "@/app/session-provider";

export function LogOutButton({ children, className, ...props }: ButtonProps) {
  const { setUser } = useSession();

  const [isPending, startTransition] = useTransition();
  function hadnleLogOut() {
    startTransition(async () => {
      setUser(null);
      const error = await logOut();
      if (error) {
        toast.error(error);
      }
    });
  }
  return (
    <LoadingButton
      loading={isPending}
      variant="destructive"
      size="icon"
      onClick={hadnleLogOut}
      className={className}
      {...props}
    >
      {children}
    </LoadingButton>
  );
}
