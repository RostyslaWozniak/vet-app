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
import {
  contactFormSchema,
  type ContactFormSchema,
} from "../lib/contact-form-schema";
import LoadingButton from "@/components/loading-button";
import { useTransition } from "react";
import { sendContactForm } from "../actions/send-contact-form";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormSchema) {
    startTransition(async () => {
      const error = await sendContactForm(values);
      if (error) {
        toast.error(error, {
          position: "bottom-right",
        });
        return;
      }
      startTransition(() => {
        toast.success("Dziękujemy, Twoja wiadomosć została wysłana", {
          position: "bottom-right",
        });
        form.reset();
      });
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 sm:space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="data-[error=true]:text-white">
                Imię
              </FormLabel>
              <FormControl>
                <Input
                  className="text-foreground"
                  placeholder="Wpisz swoje imię"
                  {...field}
                />
              </FormControl>

              <FormMessage className="absolute top-0 right-0 w-min rounded-full bg-red-600 px-2 text-xs font-semibold text-nowrap text-white" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="data-[error=true]:text-white">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  className="text-foreground"
                  placeholder="Wpisz swój email"
                  {...field}
                />
              </FormControl>

              <FormMessage className="absolute top-0 right-0 w-min rounded-full bg-red-600 px-2 text-xs font-semibold text-nowrap text-white" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="data-[error=true]:text-white">
                Wiadomość
              </FormLabel>
              <FormControl>
                <Textarea
                  className="text-foreground min-h-32 resize-none"
                  placeholder="Wpisz swoją wiadomość"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute top-0 right-0 w-min rounded-full bg-red-600 px-2 text-xs font-semibold text-nowrap text-white" />
            </FormItem>
          )}
        />
        <LoadingButton
          loading={isPending}
          type="submit"
          variant="secondary"
          className="float-end h-auto w-full !px-6 sm:w-auto"
        >
          Wyślij wiadomość <ArrowRight />
        </LoadingButton>
      </form>
    </Form>
  );
}
