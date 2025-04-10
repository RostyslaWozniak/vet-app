"use client";

import { Clock, Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

type ServiceCardProps = {
  service: {
    id: string;
    name: string;
    isActive: boolean;
    description: string | null;
    durationInMinutes: number;
    updatedAt: Date;
    createdAt: Date;
  };
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card
      key={service.id}
      className="hover:border-primary/50 overflow-hidden border-2 pb-0 transition-all duration-200"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-2 text-xl font-bold">
            {service.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-muted-foreground line-clamp-3 min-h-[60px] text-sm">
          {service.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="bg-muted/30 flex justify-between border-t pb-6">
        <div className="text-muted-foreground flex items-center text-sm">
          <Clock className="mr-1 h-4 w-4" />
          {service.durationInMinutes} min
        </div>
        <div className="text-muted-foreground text-xs">
          Aktualizacja:{" "}
          {format(service.updatedAt, "dd MMM yyyy", { locale: pl })}
        </div>
      </CardFooter>
    </Card>
  );
}
