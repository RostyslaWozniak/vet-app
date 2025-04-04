"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { toggleRole } from "@/server/actions/admin/toggle-role";

export function RolesToggleForm({
  user,
}: {
  user: {
    id: string;
    roles: $Enums.Roles[];
  };
}) {
  const form = useForm<ToggleRoleSchema>({
    resolver: zodResolver(toggleRoleSchema),
    defaultValues: {
      userId: user.id,
      roles: user.roles,
    },
  });

  async function onSubmit(data: ToggleRoleSchema) {
    try {
      const error = await toggleRole(data);
      if (error) {
        toast.error("Something went wrong");
      } else {
        toast.success("Roles updated successfully");
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center"
      >
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormControl className="min-w-84">
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
        <Button
          variant="default"
          type="submit"
          size="sm"
          className="ml-3 w-min"
        >
          Zapisz
        </Button>
      </form>
    </Form>
  );
}
