import { LinkButton } from "@/components/link-button";
import { Calendar, Plus } from "lucide-react";

export function EmptyAppointments({
  message = "Jeszcze nie masz żadnych wizyt",
}: {
  message?: string;
}) {
  return (
    <div className="bg-muted/30 flex flex-col items-center justify-center rounded-lg border border-dashed px-4 py-12">
      <Calendar className="text-muted-foreground mb-4 h-12 w-12" />
      <h3 className="mb-1 text-lg font-medium">{message}</h3>
      <p className="text-muted-foreground max-w-md text-center text-sm">
        Po umówieniu wizyty pojawią się one tutaj. Możesz łatwo śledzić i
        zarządzać wszystkimi swoimi wizytami w jednym miejscu.
      </p>
      <LinkButton href="/appointments/new" className="my-4 w-full">
        <Plus /> Umów wizytę
      </LinkButton>
    </div>
  );
}
