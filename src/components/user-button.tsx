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
import { Calendar, CatIcon, Lock, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { LinkButton } from "./link-button";

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
            {(user.roles.includes("CLIENT") ||
              user.roles.includes("ADMIN")) && (
              <Link href={`/me`}>
                <DropdownMenuItem
                  variant={pathname.startsWith("/me") ? "active" : "default"}
                >
                  <UserIcon className="mr-2 size-4" />
                  Profile
                </DropdownMenuItem>
              </Link>
            )}
            {(user.roles.includes("CLIENT") ||
              user.roles.includes("ADMIN")) && (
              <Link href={`/appointments`}>
                <DropdownMenuItem
                  variant={
                    pathname.startsWith("/appointments") ? "active" : "default"
                  }
                >
                  <Calendar className="mr-2 size-4" />
                  Wizyty
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
              <LogOutButton className="w-full" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="">
          <LinkButton variant="outline" href="/sign-in">
            Zaloguj
          </LinkButton>
        </div>
      )}
    </>
  );
}
