"use client";

import type React from "react";
import { LinkButton } from "@/components/link-button";
import { Edit } from "lucide-react";
import { useSession } from "@/app/session-provider";
// import { UploadButton } from "@/lib/services/uploadthing";
// import { useState } from "react";
// import { toast } from "sonner";
import { Avatar } from "@/components/custom-ui/avatar";
import { redirect } from "next/navigation";
import Link from "next/link";

export function ProfileHeader() {
  const { user } = useSession();

  if (!user) redirect("/sign-in");

  // const [imageUrl, setImageUrl] = useState(user.photo ?? "");

  return (
    <div className="relative flex flex-col items-center rounded-lg border p-4 md:flex-row md:gap-x-12 md:p-6">
      <div className="relative mb-2">
        <Avatar
          photo={user.photo ?? ""}
          name={user.name}
          className="h-16 w-16"
        />
        {/* <div className="bg-foreground absolute right-0 bottom-0 isolate rounded-full p-1">
          <CameraIcon className="stroke-background -z-10 size-6 md:size-5" />

          <UploadButton
            endpoint="profileAvatarUploader"
            className="ut-button:absolute ut-button:inset-0 ut-button:z-50 ut-button:opacity-0 absolute inset-0 z-50 opacity-0"
            onClientUploadComplete={(res) => {
              const fileUrl = res[0]?.ufsUrl ?? "";
              setImageUrl(fileUrl);
              toast.success("Zdjęcie zostało zaktualizowane");
            }}
            onChange={(data) => {
              console.log(data);
            }}
            onUploadError={() => {
              toast.error("Coś poszło nie tak. Spróbuj ponownie.");
            }}
          /> 
        </div>*/}
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
      {/* <LogOutButton className="absolute top-2 right-2" size="sm">
        Wyloguj <LogOut />
      </LogOutButton> */}
    </div>
  );
}
