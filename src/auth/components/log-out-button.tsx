"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "../actions/logout-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LogOutButton({ className }: { className?: string }) {
  const router = useRouter();

  async function hadnleLogOut() {
    try {
      await logOut();
      router.refresh();
    } catch {
      toast.error("Wystąpił błąd podczas wylogowywania. Spróbuj ponownie.");
    }
  }
  return (
    <Button variant="destructive" onClick={hadnleLogOut} className={className}>
      Wyloguj{" "}
    </Button>
  );
}
