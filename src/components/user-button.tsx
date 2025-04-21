"use client";

import { LogOutButton } from "@/auth/components/log-out-button";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import { CatIcon, Lock, LogIn, LogOut, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { LinkButton } from "./link-button";
import { api } from "@/trpc/react";

export function UserButton() {
  const pathname = usePathname();
  const { data: user, isLoading } = api.public.user.getCurrentUser.useQuery();
  return (
    <>
      {isLoading ? (
        <div className="bg-background h-10 w-10 animate-pulse rounded-full" />
      ) : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn("flex-none cursor-pointer rounded-full")}>
              <UserAvatar avatarUrl={user.photo} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-60" align="end">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(user.roles.includes("CLIENT") ||
              user.roles.includes("ADMIN")) && (
              <Link href={`/profile`}>
                <DropdownMenuItem
                  variant={
                    pathname.startsWith("/profile") ? "active" : "default"
                  }
                >
                  <UserIcon className="mr-2 size-4" />
                  Profil
                </DropdownMenuItem>
              </Link>
            )}

            {user.roles.includes("VET") && (
              <Link href="/vet">
                <DropdownMenuItem
                  variant={pathname.startsWith("/vet") ? "active" : "default"}
                >
                  <CatIcon className="mr-2 size-4" />
                  Profil weterynarza
                </DropdownMenuItem>
              </Link>
            )}
            {user.roles.includes("ADMIN") && (
              <Link href="/admin">
                <DropdownMenuItem
                  variant={pathname.startsWith("/admin") ? "active" : "default"}
                >
                  <Lock className="mr-2 size-4" />
                  Administrator
                </DropdownMenuItem>
              </Link>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutButton className="w-full">
                Wyloguj <LogOut className="text-destructive-foreground" />
              </LogOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LinkButton
          variant="outline"
          size="icon"
          href="/sign-in"
          className="p-4.75"
        >
          <LogIn className="min-h-5 min-w-5" />
        </LinkButton>
      )}
    </>
  );
}
