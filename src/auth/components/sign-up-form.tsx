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
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpSchema } from "../schemas/sign-up-schema";
import { signUp } from "@/auth/actions/sign-up-action";
import { toast } from "sonner";
import { PasswordInput } from "./password-input";
import LoadingButton from "@/components/loading-button";

export function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpSchema) {
    const error = await signUp(data);
    toast.error(error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Imię{" "}
                {form.formState.errors.name && (
                  <p className="text-destructive text-xs">
                    ( {form.formState.errors.name.message} )
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="Wpisz swoje imie" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
                  type="email"
                  placeholder="Wpisz swój adres email"
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
                  placeholder="Wpisz biezpieczne hasło"
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
