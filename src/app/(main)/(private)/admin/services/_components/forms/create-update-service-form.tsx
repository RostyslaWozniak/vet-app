"use client";

import { AdminServicesSchema } from "@/server/modules/admin/admin-services/admin-services.schema";
import type {
  AdminServiceGetAllDTO,
  AdminServicesCreateType,
} from "@/server/modules/admin/admin-services/admin-services.types";
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
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import LoadingButton from "@/components/loading-button";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

export function CreateUpdateServiceForm({
  service,
  setIsEditOpen,
}: {
  service?: AdminServiceGetAllDTO;
  setIsEditOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const form = useForm<AdminServicesCreateType>({
    resolver: zodResolver(AdminServicesSchema.create),
    defaultValues: {
      name: service ? service.name : "",
      description: service ? (service.description ?? undefined) : undefined,
      durationInMinutes: service ? service.durationInMinutes : 15,
      isActive: service ? service.isActive : true,
    },
  });

  const { mutate: createService, isPending: isCreatePending } =
    api.admin.services.create.useMutation({
      onSuccess: () => {
        router.push("/admin/services");
      },
      onError: (error) => {
        console.log({ error });
      },
    });

  const { mutate: updateService, isPending: isUpdatePending } =
    api.admin.services.update.useMutation({
      onSuccess: () => {
        router.refresh();
        if (setIsEditOpen) setIsEditOpen(false);
      },
      onError: (error) => {
        console.log({ error });
        if (setIsEditOpen) setIsEditOpen(false);
      },
    });

  function onSubmit(values: AdminServicesCreateType) {
    if (service) {
      updateService({ id: service.id, ...values });
    } else {
      createService(values);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid items-start gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwa usługi*</FormLabel>
                <FormControl>
                  <Input placeholder="Wpisz nazwę usługi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="durationInMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Czas trwania*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Wpisz czas trwania usługi w minutach"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis usługi (opcjonalne)</FormLabel>
              <FormControl>
                <Textarea placeholder="Wpisz opis usługi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Czy usługa jest aktywna </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          loading={isCreatePending || isUpdatePending}
          disabled={!form.formState.isDirty}
          className="float-right"
        >
          {service ? "Zapisz" : "Stwórz"}
        </LoadingButton>
      </form>
    </Form>
  );
}
