"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
// import { toZonedTime } from "date-fns-tz";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { formatDate, formatTimeString } from "@/lib/formatters";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import {
  appointmentFromSchema,
  type AppointmentFormSchema,
} from "@/lib/schema/appointment-schema";
import { createAppointment } from "@/server/actions/appointment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AppointmentForm({
  validTimes,
  serviceId,
  user,
}: {
  validTimes: Date[];
  serviceId: string;
  user: {
    name: string;
    email: string;
  } | null;
}) {
  const router = useRouter();
  const form = useForm<AppointmentFormSchema>({
    resolver: zodResolver(appointmentFromSchema),
    defaultValues: {
      guestName: user?.name ?? "",
      guestEmail: user?.email ?? "",
    },
  });

  const date = form.watch("date");

  async function onSubmit(values: AppointmentFormSchema) {
    console.log(values);
    try {
      const error = await createAppointment({ ...values, serviceId });
      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Pomyślnie zapisano wizytę.");
      router.push(user ? "/profile/appointments" : "/");
    } catch {
      toast.error("Wystąpił błąd. Spróbuj ponownie.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {form.formState.errors.root && (
          <div className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <Popover>
                <FormItem className="flex-1">
                  <FormLabel>Data*</FormLabel>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "border-foreground flex w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          formatDate(field.value)
                        ) : (
                          <span>Wybierz datę</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: string | number | Date) =>
                        !validTimes.some((time) => isSameDay(date, time))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                  <FormMessage />
                </FormItem>
              </Popover>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Godzina*</FormLabel>
                  <Select
                    disabled={date == null}
                    onValueChange={(value) =>
                      field.onChange(new Date(Date.parse(value)))
                    }
                    defaultValue={field.value?.toISOString()}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            date == null
                              ? "Wybierz najpierw datę"
                              : "Wybierz godzinę"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {validTimes
                        .filter((time) => isSameDay(time, date))
                        .map((time) => (
                          <SelectItem
                            key={time?.toISOString()}
                            value={time?.toISOString()}
                          >
                            {formatTimeString(time)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <FormField
            control={form.control}
            name="guestName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Imię*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guestEmail"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="guestNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis (opcjonalne)</FormLabel>
              <FormControl>
                <Textarea className="h-32 resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            disabled={form.formState.isSubmitting}
            type="button"
            asChild
            variant="outline"
          >
            <Link href={`/`}>Anuluj</Link>
          </Button>
          <Button disabled={form.formState.isSubmitting} type="submit">
            Potwierdź
          </Button>
        </div>
      </form>
    </Form>
  );
}
