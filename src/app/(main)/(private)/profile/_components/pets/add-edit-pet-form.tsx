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

export function AddEditPetForm() {
  const router = useRouter();

  const { mutate: createPet, isPending: isPetCreating } =
    api.private.pet.create.useMutation({
      onSuccess: () => {
        toast.success("Pupila dodano");
        router.push("/profile/pets");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });
  const form = useForm<PetFromSchema>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: "",
      species: "",
      breed: "",
      age: 0,
    },
  });

  function onSubmit(values: PetFromSchema) {
    createPet(values);
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
                <Input placeholder="Wpisz swoje imię" {...field} />
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
                <Input placeholder="Wpisz gatunek pupila" {...field} />
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
                <Input placeholder="Wpisz wiek swojego pupila" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <LoadingButton
            loading={isPetCreating}
            disabled={!form.formState.isDirty}
            type="submit"
            className="w-full sm:w-auto"
          >
            Dodaj pupila
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
