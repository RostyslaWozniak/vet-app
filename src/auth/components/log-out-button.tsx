"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "../actions/logout-action";
import { useRouter } from "next/navigation";

export function LogOutButton({ className }: { className?: string }) {
  const router = useRouter();

  async function hadnleLogOut() {
    await logOut();
    router.refresh();
  }
  return (
    <Button variant="destructive" onClick={hadnleLogOut} className={className}>
      Wyloguj{" "}
    </Button>
  );
}
