import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkButton } from "@/components/link-button";
import { Edit, LogOut } from "lucide-react";
import { LogOutButton } from "@/auth/components/log-out-button";

type User = {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  roles: string[];
};

type ProfileHeaderProps = {
  user: User;
};

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative flex flex-col items-center rounded-lg border p-4 md:w-min md:flex-row md:gap-x-12 md:p-6">
      <div className="relative mb-4">
        <Avatar className="h-20 w-20 md:h-24 md:w-24">
          <AvatarImage src={user.photo ?? ""} alt={user.name} />
          <AvatarFallback className="text-xl md:text-2xl">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center md:text-start">
        <h2 className="text-xl font-bold md:text-2xl">{user.name}</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          {user.email}
        </p>
      </div>
      <LinkButton
        className="absolute top-2 left-2"
        href="/profile/edit"
        variant="link"
      >
        <Edit />
      </LinkButton>
      <LogOutButton className="absolute top-2 right-2">
        <LogOut />
      </LogOutButton>
    </div>
  );
}
