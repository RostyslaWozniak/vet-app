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
import { useTransition } from "react";
import { useSession } from "@/app/session-provider";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();

  const { setUser } = useSession();
  const router = useRouter();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpSchema) {
    startTransition(async () => {
      const res = await signUp(data);
      if (res?.error) {
        toast.error(res.error);
      }
      if (res?.user) {
        router.push("/profile");
        setUser(res.user);
      }
    });
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
        <LoadingButton loading={isPending} type="submit" className="w-full">
          Zarejestruj
        </LoadingButton>
      </form>
    </Form>
  );
}
