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
import { CatIcon, Lock, LogInIcon, LogOut, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { LinkButton } from "./link-button";
import { api } from "@/trpc/react";
import { Button } from "./ui/button";

export function UserButton() {
  const { data: user, isLoading } = api.public.user.getCurrentUser.useQuery();

  const pathname = usePathname();

  return (
    <>
      {isLoading ? (
        <div className="aspect-square h-10 animate-pulse rounded-full bg-slate-50"></div>
      ) : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "border-primary flex-none cursor-pointer rounded-full border",
              )}
            >
              <UserIcon className="size-6" />
            </Button>
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
            <LogOutButton className="w-full" size="sm">
              Wyloguj <LogOut className="text-destructive-foreground" />
            </LogOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LinkButton variant="outline" size="icon" href="/sign-in" className="">
          <LogInIcon className="size-5" />
        </LinkButton>
      )}
    </>
  );
}
