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
// import { toggleRole } from "@/server/actions/admin/toggle-role";
import LoadingButton from "@/components/loading-button";
// import { useRouter } from "next/navigation";

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
  // const router = useRouter();
  const form = useForm<ToggleRoleSchema>({
    resolver: zodResolver(toggleRoleSchema),
    defaultValues: {
      userId: user.id,
      roles: user.roles,
    },
  });

  async function onSubmit(data: ToggleRoleSchema) {
    console.log(data);
    setIsEditOpen(false);
    // try {
    //   const error = await toggleRole(data);
    //   if (error) {
    //     toast.error("Wystąpił błąd. Spróbuj ponownie.");
    //   } else {
    //     toast.success("Uprawnienia zaktualizowane");
    //     router.refresh();
    //   }
    //   setIsEditOpen(false);
    // } catch {
    //   toast.error("Wystąpił błąd. Spróbuj ponownie.");
    // }
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
                    label: role.toLocaleUpperCase(),
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
          loading={form.formState.isSubmitting}
        >
          Zapisz
        </LoadingButton>
      </form>
    </Form>
  );
}
