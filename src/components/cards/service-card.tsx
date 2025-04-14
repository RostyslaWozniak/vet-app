import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RouterOutputs } from "@/trpc/react";
import { H3 } from "../typography";

type ServiceCardProps = {
  service: RouterOutputs["public"]["services"]["getAll"][number];
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card
      key={service.id}
      className="hover:border-primary/50 overflow-hidden border-2 border-transparent transition-all duration-200 hover:shadow-md"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold">
            <H3>{service.name}</H3>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow items-center">
        <CardDescription className="text-muted-foreground line-clamp-3">
          {service.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="bg-muted/30 flex justify-between border-t">
        <div className="text-muted-foreground flex items-center text-sm">
          <Clock className="mr-1 w-4" />
          {service.durationInMinutes} min
        </div>
      </CardFooter>
    </Card>
  );
}
