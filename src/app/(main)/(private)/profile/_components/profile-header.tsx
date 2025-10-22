"use client";

import type React from "react";
import { LinkButton } from "@/components/link-button";
import { Edit, LogOut } from "lucide-react";
import { useSession } from "@/app/session-provider";
import { Avatar } from "@/components/custom-ui/avatar";
import Link from "next/link";
import { LogOutButton } from "@/auth/components/log-out-button";
import { ProfileHeaderSkeleton } from "./skeletons/profile-header-skeleton";

export function ProfileHeader() {
  const { user, isUserLoading } = useSession();

  if (isUserLoading) return <ProfileHeaderSkeleton />;

  if (!user) return null;

  return (
    <div className="relative flex flex-col items-center rounded-lg border p-4 md:flex-row md:gap-x-12 md:p-6">
      <div className="relative mb-2 md:mb-0">
        <Avatar
          photo={user.photo ?? ""}
          name={user.name}
          className="h-16 w-16"
        />
      </div>
      <div className="text-center md:text-start">
        <h2 className="text-primary text-base font-bold md:text-2xl">
          {user.name}
        </h2>
        <p className="text-muted-foreground text-xs md:text-base">
          {user.email}
        </p>
        {!user.phoneNumber && (
          <Link href="/profile/edit" className="text-primary text-xs">
            Dodaj numer telefonu
          </Link>
        )}
      </div>
      <LinkButton
        className="absolute top-0 left-0"
        href="/profile/edit"
        variant="link"
      >
        <Edit className="size-4.5 md:size-5" />
      </LinkButton>
      <LogOutButton
        className="absolute top-2 right-2 gap-x-1 text-xs sm:gap-x-2 sm:text-sm"
        size="sm"
      >
        Wyloguj <LogOut />
      </LogOutButton>
    </div>
  );
}
