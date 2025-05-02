"use client";

import { useSession } from "@/app/session-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loading-button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { AvatarImage } from "@radix-ui/react-avatar";
// import { getInitials } from "@/lib/utils";
// import { Camera } from "lucide-react";
import { updateUserProfile, type UpdateUserProfile } from "@/lib/schema/user";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function EditProfileFrom() {
  const { user, setUser } = useSession();
  const router = useRouter();

  if (!user) {
    redirect("/sign-in");
  }

  const { mutate: updateProfile, isPending: isUpdating } =
    api.private.user.updateProfile.useMutation({
      onSuccess: ({ name, email, phoneNumber }) => {
        toast.success("Profil został zaktualizowany");
        router.push("/profile");
        setUser((prev) => {
          if (prev == null) return null;
          return {
            ...prev,
            name,
            email,
            phoneNumber,
          };
        });
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  // 1. Define your form.
  const form = useForm<UpdateUserProfile>({
    resolver: zodResolver(updateUserProfile),
    defaultValues: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber ?? undefined,
      photo: user.photo ?? "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: UpdateUserProfile) {
    updateProfile(values);
  }

  // const userInitials = getInitials(form.getValues("name"));
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* PHOTO */}
        {/* <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem className="flex justify-center">
              <FormControl>
                <div className="relative isolate w-min p-3">
                  <Avatar className="h-20 w-20 md:h-24 md:w-24">
                    <AvatarImage src={field.value ?? ""} alt={user.name} />
                    <AvatarFallback className="text-xl md:text-2xl">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-primary text-primary-foreground absolute right-3 bottom-3 rounded-full p-1.5">
                    <Camera className="h-5 w-5" />
                  </div>
                  <Input
                    type="file"
                    {...field}
                    className="absolute inset-0 z-50 h-full cursor-pointer opacity-0"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex h-5 items-center gap-4">
                <FormLabel>Imię</FormLabel>
                <FormMessage className="text-sm" />
              </div>
              <FormControl autoFocus>
                <Input placeholder="Wpisz swoje imię" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* EMAIL */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Wpisz swój email" {...field} />
              </FormControl>
              {form.getValues("email") !== user.email && (
                <Alert variant="warning">
                  <TriangleAlert className="h-4 w-4" />
                  <AlertDescription>
                    Pamiętaj, że po zmianie e-maila musisz go ponownie
                    potwierdzić za pomocą linku wysłanego na nowy adres.
                  </AlertDescription>
                </Alert>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PHONE */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>

              <FormControl>
                <Input placeholder="+48 XXX XXX XXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <LoadingButton
            loading={isUpdating}
            disabled={!form.formState.isDirty}
            type="submit"
            className="w-full sm:w-auto"
          >
            Zapisz dane
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
