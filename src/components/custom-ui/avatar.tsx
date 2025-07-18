import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";

export function Avatar({
  photo,
  name,
  className,
}: {
  photo: string | null;
  name: string;
  className?: string;
}) {
  const initials = getInitials(name);
  return (
    <ShadcnAvatar
      className={cn("h-20 w-20 text-xl md:h-24 md:w-24 md:text-2xl", className)}
    >
      <AvatarImage src={photo ?? ""} alt={name} className="object-cover" />
      <AvatarFallback className="">{initials}</AvatarFallback>
    </ShadcnAvatar>
  );
}
