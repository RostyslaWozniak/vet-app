import { Skeleton } from "@/components/ui/skeleton";

export function PetsSectionSkeleton({
  petsToShow = 1,
}: {
  petsToShow?: number;
}) {
  return (
    <div className="flex flex-col">
      <div className="mt-3 mb-4 flex items-center justify-between gap-x-20">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-60" />
      </div>

      <div className="flex items-center gap-x-2 lg:gap-x-4">
        {Array.from({ length: petsToShow }).map((_, i) => (
          <PetItemSkeleton key={i} />
        ))}
        <AddPetButtonSkeleton />
      </div>
    </div>
  );
}

function PetItemSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="mb-1 aspect-square h-16 rounded-full" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}
function AddPetButtonSkeleton() {
  return (
    <Skeleton className="border-primary/20 relative mx-2 flex h-24 min-w-24 flex-col items-center justify-center rounded-lg border px-2 py-3 lg:h-28 lg:w-28" />
  );
}
