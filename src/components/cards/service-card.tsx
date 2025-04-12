"use client";

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
      className="hover:border-primary/50 overflow-hidden border-2 border-transparent pb-0 transition-all duration-200 hover:shadow-md"
    >
      <CardHeader className="pb-3">
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
      <CardFooter className="bg-muted/30 flex justify-between border-t pb-6">
        <div className="text-muted-foreground flex items-center text-sm">
          <Clock className="mr-1 h-4 w-4" />
          {service.durationInMinutes} min
        </div>
      </CardFooter>
    </Card>
  );
}
