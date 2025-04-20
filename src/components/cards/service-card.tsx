import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import type { RouterOutputs } from "@/trpc/react";
import { H3 } from "../typography";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: RouterOutputs["public"]["services"]["getAll"][number];
  className?: string;
  showDescription?: boolean;
};

export function ServiceCard({
  service,
  className,
  showDescription = false,
}: ServiceCardProps) {
  return (
    <Card
      key={service.id}
      className={cn(
        "hover:border-primary/50 overflow-hidden border-2 border-transparent p-2 transition-all duration-200 hover:shadow-md md:p-4",
        className,
      )}
    >
      <CardContent className="flex-grow flex-col p-0 md:flex md:gap-y-2">
        <CardTitle className="text-xl font-bold">
          <H3 className="text-lg md:text-2xl">{service.name}</H3>
        </CardTitle>
        {showDescription && (
          <CardDescription className="text-muted-foreground line-clamp-3">
            {service.description}
          </CardDescription>
        )}
      </CardContent>
      <div className="text-muted-foreground flex items-center text-sm">
        <Clock className="mr-1 w-4" />
        {service.durationInMinutes} min
      </div>
    </Card>
  );
}
