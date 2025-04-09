"use client";

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
import { usePathname } from "next/navigation";

export function UserButton({ user }: { user: FullUser | null }) {
  const pathname = usePathname();
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
            {user.roles.includes("CLIENT") && (
              <Link href={`/me`}>
                <DropdownMenuItem
                  variant={pathname.startsWith("/me") ? "active" : "default"}
                >
                  <UserIcon className="mr-2 size-4" />
                  Profile
                </DropdownMenuItem>
              </Link>
            )}
            {user.roles.includes("VET") && (
              <Link href="/vet">
                <DropdownMenuItem
                  variant={pathname.startsWith("/vet") ? "active" : "default"}
                >
                  <CatIcon className="mr-2 size-4" />
                  Vet
                </DropdownMenuItem>
              </Link>
            )}
            {user.roles.includes("ADMIN") && (
              <Link href="/admin">
                <DropdownMenuItem
                  variant={pathname.startsWith("/admin") ? "active" : "default"}
                >
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
