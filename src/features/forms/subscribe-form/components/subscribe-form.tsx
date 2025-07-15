"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  subscribeFormSchema,
  type SubscribeFormSchema,
} from "../lib/subscribe-form-schema";
import LoadingButton from "@/components/loading-button";
import { useTransition } from "react";
import { toast } from "sonner";
import { PenIcon } from "lucide-react";
import { subscribeForNewsletter } from "../actions/subscribe";

export function SubscribeForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SubscribeFormSchema>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: SubscribeFormSchema) {
    startTransition(async () => {
      const error = await subscribeForNewsletter(values);
      if (error) {
        toast.error(error, {
          position: "bottom-right",
        });
        return;
      }
      startTransition(() => {
        toast.success("Dziękujemy, jestes zapisany", {
          position: "bottom-right",
        });
        form.reset();
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormMessage />

              <FormControl>
                <Input
                  className="text-foreground"
                  placeholder="Wpisz swój email"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <LoadingButton
          loading={isPending}
          type="submit"
          variant="outline"
          className="float-end h-auto w-full !px-6"
        >
          Zapisz się <PenIcon />
        </LoadingButton>
      </form>
    </Form>
  );
}
