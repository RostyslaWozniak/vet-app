import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AppointmentSectionSkeleton({
  appointmentsToShow,
}: {
  appointmentsToShow: number;
}) {
  return (
    <div className="flex flex-col">
      <div className="my-4 flex items-center justify-between gap-x-20">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-60" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: appointmentsToShow }).map((_, i) => (
          <AppointmentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function AppointmentCardSkeleton() {
  return (
    <Card className="bg-transparent">
      <CardContent className="flex-grow space-y-2">
        <CardTitle className="mb-2 flex items-center justify-between gap-x-20">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-5 w-60" />
        </CardTitle>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter className="flex">
        <div className="flex-grow space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <Skeleton className="h-8 w-2/5" />
      </CardFooter>
    </Card>
  );
}
