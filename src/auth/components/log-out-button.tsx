"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { logOut } from "../actions/logout-action";
import { toast } from "sonner";

export function LogOutButton({ children, className, ...props }: ButtonProps) {
  async function hadnleLogOut() {
    const error = await logOut();
    if (error) {
      toast.error(error);
    }
  }
  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={hadnleLogOut}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
}
