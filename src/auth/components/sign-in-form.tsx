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
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/session-provider";

export function SignInForm() {
  const [isPending, startTransition] = useTransition();

  const { setUser } = useSession();
  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInSchema) {
    startTransition(async () => {
      const res = await signIn(data);
      if (res?.error) {
        toast.error(res.error);
      }
      if (res?.user) {
        router.push(res?.redirectUrl);
        startTransition(() => setUser(res.user));
      }
    });
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
        <LoadingButton loading={isPending} type="submit" className="w-full">
          Zaloguj
        </LoadingButton>
      </form>
    </Form>
  );
}
