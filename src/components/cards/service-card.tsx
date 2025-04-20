import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import type { RouterOutputs } from "@/trpc/react";
import { H3 } from "../typography";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: RouterOutputs["public"]["services"]["getAll"][number];
  className?: string;
  showDescription?: boolean;
  descriptionClassName?: string;
};

export function ServiceCard({
  service,
  className,
  showDescription = false,
  descriptionClassName,
}: ServiceCardProps) {
  return (
    <Card
      key={service.id}
      className={cn(
        "hover:border-primary/50 overflow-hidden border-2 border-transparent p-2 transition-all duration-200 hover:shadow-md md:p-4",
        className,
      )}
    >
      <CardContent className="flex-grow flex-col px-1 sm:px-4 md:flex md:gap-y-2">
        <CardTitle className="text-xl font-bold">
          <H3 className="text-lg md:text-2xl">{service.name}</H3>
        </CardTitle>
        {showDescription && (
          <CardDescription
            className={cn(
              "text-muted-foreground line-clamp-3",
              descriptionClassName,
            )}
          >
            {service.description}
          </CardDescription>
        )}
      </CardContent>
      <CardFooter className="px-1 sm:px-4">
        <div className="text-muted-foreground flex items-center text-sm">
          <Clock className="mr-1 w-4" />
          {service.durationInMinutes} min
        </div>
      </CardFooter>
    </Card>
  );
}
