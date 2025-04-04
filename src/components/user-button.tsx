import { LogOutButton } from "@/auth/components/log-out-button";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { type FullUser } from "@/auth/current-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import { CatIcon, Lock, UserIcon } from "lucide-react";
import { Button } from "./ui/button";

export function UserButton({ user }: { user: FullUser | null }) {
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn("flex-none cursor-pointer rounded-full")}>
              <UserAvatar avatarUrl={user.photo} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-60" align="end">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/users/${user.name}`}>
              <DropdownMenuItem>
                <UserIcon className="mr-2 size-4" />
                Profile
              </DropdownMenuItem>
            </Link>
            {user.roles.includes("VET") && (
              <Link href="/vet">
                <DropdownMenuItem>
                  <CatIcon className="mr-2 size-4" />
                  Vet
                </DropdownMenuItem>
              </Link>
            )}
            {user.roles.includes("ADMIN") && (
              <Link href="/admin">
                <DropdownMenuItem>
                  <Lock className="mr-2 size-4" />
                  Admin
                </DropdownMenuItem>
              </Link>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutButton className="w-full" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </>
  );
}
