import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EditIcon, LogOutIcon } from "lucide-react";

export function ProfileHeaderSkeleton() {
  return (
    <div className="relative flex flex-col items-center rounded-lg border p-4 md:flex-row md:gap-x-12 md:p-6">
      <Skeleton className="mb-3 h-16 w-16 rounded-full md:mb-0 md:h-24 md:w-24" />
      <div className="space-y-2 md:space-y-3">
        <Skeleton className="h-4 w-48 md:h-6 md:w-60" />
        <Skeleton className="h-4 w-60 md:w-64" />
      </div>
      <Button className="absolute top-0 left-0" variant="link">
        <EditIcon className="size-4.5 md:size-5" />
      </Button>
      <Button
        className="absolute top-2 right-2 gap-x-1 text-xs sm:gap-x-2 sm:text-sm"
        size="sm"
        variant="destructive"
      >
        Wyloguj <LogOutIcon />
      </Button>
    </div>
  );
}
