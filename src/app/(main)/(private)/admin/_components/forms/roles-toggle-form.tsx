"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { MultiSelect } from "@/components/multi-select";
import { type $Enums } from "@prisma/client";
import {
  rolesList,
  toggleRoleSchema,
  type ToggleRoleSchema,
} from "@/lib/schema/toggle-role-schema";
import LoadingButton from "@/components/loading-button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { mapRoles } from "@/lib/map-roles";

export function RolesToggleForm({
  user,
  setIsEditOpen,
}: {
  user: {
    id: string;
    roles: $Enums.Roles[];
  };
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { mutate: changeRoles, isPending } =
    api.admin.user.chageRoles.useMutation({
      onSuccess: () => {
        setIsEditOpen(false);
        router.refresh();
        toast.success("Rola została zmieniona.");
      },
      onError: () => {
        setIsEditOpen(false);
        toast.error("Coś poszło nie tak. Spróbuj ponownie.");
      },
    });

  const form = useForm<ToggleRoleSchema>({
    resolver: zodResolver(toggleRoleSchema),
    defaultValues: {
      userId: user.id,
      roles: user.roles,
    },
  });

  async function onSubmit(data: ToggleRoleSchema) {
    changeRoles(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-3 p-5"
      >
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormControl className="min-w-100">
                <MultiSelect
                  options={rolesList.map((role) => ({
                    value: role,
                    label: mapRoles([role]),
                  }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select options"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          variant="default"
          type="submit"
          className="w-full"
          loading={isPending}
          disabled={!form.formState.isDirty}
        >
          Zapisz
        </LoadingButton>
      </form>
    </Form>
  );
}
