"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { signInSchema, type SignInSchema } from "../schemas/sign-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/auth/actions/sign-in-action";
import { PasswordInput } from "./password-input";
import LoadingButton from "@/components/loading-button";
import { toast } from "sonner";

export function SignInForm() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInSchema) {
    const error = await signIn(data);
    toast.error(error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email{" "}
                {form.formState.errors.email && (
                  <p className="text-destructive text-xs">
                    ( {form.formState.errors.email.message} )
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Wpisz swój email"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Hasło{" "}
                {form.formState.errors.password && (
                  <p className="text-destructive text-xs">
                    ( {form.formState.errors.password.message} )
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Wpisz swoje hasło"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <LoadingButton
          loading={form.formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          Log in
        </LoadingButton>
      </form>
    </Form>
  );
}
