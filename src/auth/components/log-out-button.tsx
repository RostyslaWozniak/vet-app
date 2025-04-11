"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "../actions/logout-action";

export function LogOutButton({ className }: { className?: string }) {
  return (
    <Button
      variant="destructive"
      onClick={async () => await logOut()}
      className={className}
    >
      Wyloguj{" "}
    </Button>
  );
}
