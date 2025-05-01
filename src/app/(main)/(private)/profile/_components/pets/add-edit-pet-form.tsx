"use client";

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
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { petFormSchema, type PetFromSchema } from "@/lib/schema/pet";
import type { Pet } from "../../pets/page";
import { getAgeStringFromDate } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PetAgeSelection } from "./pet-age-selecttion";

type AddEditPetFormProps =
  | {
      pet: Pet;
      setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
      redirectUrl?: string;
    }
  | {
      pet?: undefined;
      setIsDialogOpen?: undefined;
      redirectUrl?: string;
    };

export function AddEditPetForm({
  pet,
  setIsDialogOpen,
  redirectUrl,
}: AddEditPetFormProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const { mutate, isPending } = pet
    ? api.private.pet.update.useMutation({
        onSuccess: () => {
          toast.success("Dane pupila zapisano");
          setIsDialogOpen(false);
          router.refresh();
        },
        onError: ({ message }) => {
          toast.error(message);
        },
      })
    : api.private.pet.create.useMutation({
        onSuccess: ({ id }) => {
          toast.success("Pupila dodano");
          if (redirectUrl) {
            void utils.private.pet.getAllOwn.invalidate();
            router.push(`${redirectUrl}?petId=${id}`);
          } else {
            router.push("/profile/pets");
          }
        },
        onError: ({ message }) => {
          toast.error(message);
        },
      });

  const form = useForm<PetFromSchema>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: pet?.name ?? "",
      species: pet?.species ?? "",
      breed: pet?.breed ?? "",
      age: pet?.birthday ? getAgeStringFromDate(pet.birthday) : undefined,
    },
  });

  function onSubmit(values: PetFromSchema) {
    console.log(values);
    if (pet) {
      mutate({ ...values, petId: pet.id });
    } else {
      mutate(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię*</FormLabel>

              <FormControl autoFocus>
                <Input placeholder="Wpisz imię swojego pupila" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* EMAIL */}
        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gatunek*</FormLabel>
              <FormControl>
                <Input placeholder="Wpisz gatunek (Kot, pies...)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* BREED */}
        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rasa (opcjonalnie)</FormLabel>
              <FormControl>
                <Input placeholder="Wpisz rasę swojego pupila" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* AGE */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wiek (opcjonalnie)</FormLabel>
              <FormControl>
                <PetAgeSelection field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          {pet && (
            <Button
              type="button"
              variant="outline"
              size={isMobile ? "lg" : "default"}
              className="hidde mr-2 sm:flex"
              onClick={() => setIsDialogOpen(false)}
            >
              Anuluj
            </Button>
          )}
          <LoadingButton
            loading={isPending}
            disabled={!form.formState.isDirty}
            type="submit"
            className="w-full sm:w-auto"
            size={isMobile ? "lg" : "default"}
          >
            {pet ? "Zapisz" : "Dodaj pupila"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
