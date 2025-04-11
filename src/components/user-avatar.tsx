import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  className?: string;
}

export default function UserAvatar({ className }: UserAvatarProps) {
  return (
    <div
      className={cn(
        "bg-background aspect-square h-fit flex-none rounded-full object-cover p-2",
        className,
      )}
    >
      <User />
    </div>
  );
}
