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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isSameDay, roundToNearestMinutes } from "date-fns";
import {
  appointmentFromSchema,
  type AppointmentFormSchema,
} from "@/lib/schema/appointment-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import LoadingButton from "@/components/loading-button";
import { DateSelection } from "./date-selection";
import { TimeSelection } from "./time-selection";
import { useEffect, useState } from "react";
import { NotesDialog } from "./notes-dialog";
import { getMonthRange } from "@/lib/get-month-date-range";

export function NewAppointmentForm({
  service,
  user,
}: {
  service: { id: string; durationInMinutes: number };
  user: {
    name: string;
    email: string;
  } | null;
}) {
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(true);
  const [isTimeDialogOpen, setIsTimeDialogOpen] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  function handleCalendarMonthChange(month: number, year: number) {
    setMonth(month);
    setYear(year);
  }
  const { startDate, endDate } = getMonthRange(
    month.toString(),
    year.toString(),
  );

  const nearestValidDate = roundToNearestMinutes(startDate, {
    nearestTo: 15,
    roundingMethod: "ceil",
  });

  const {
    data: validTimes,
    isLoading: isGettingValidTimes,
    error: validTimesError,
  } = api.public.schedule.getValidTimesFromSchedule.useQuery({
    nearestValidDate,
    endDate,
    service,
  });

  const router = useRouter();

  const { mutate: createAppointment, isPending: isCreating } =
    api.public.appointments.create.useMutation({
      onSuccess: () => {
        toast.success("Pomyślnie zapisano wizytę.");
        router.push(user ? "/profile" : "/");
      },

      onError: ({ message }) => {
        toast.error(message);
      },
    });

  const form = useForm<AppointmentFormSchema>({
    resolver: zodResolver(appointmentFromSchema),
    defaultValues: {
      guestName: user?.name ?? "",
      guestEmail: user?.email ?? "",
    },
  });

  const date = form.watch("date");

  async function onSubmit(values: AppointmentFormSchema) {
    createAppointment({
      ...values,
      startTime: values.startTime.toString(),
      serviceId: service.id,
    });
  }

  useEffect(() => {
    form.resetField("startTime");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("date")]);

  useEffect(() => {
    if (validTimesError) {
      toast.error(validTimesError.message);
    }
  }, [validTimesError]);

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
              <FormItem className="flex-1">
                <div className="flex h-5 items-center gap-4">
                  <FormLabel>Data*</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <DateSelection
                  isGettingValidTimes={isGettingValidTimes}
                  field={field}
                  validTimes={validTimes}
                  isOpen={isDateDialogOpen}
                  setIsOpen={setIsDateDialogOpen}
                  setIsTimeDialogOpen={setIsTimeDialogOpen}
                  handleCalendarMonthChange={handleCalendarMonthChange}
                  isUser={!!user}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <div className="flex h-5 items-center gap-4">
                    <FormLabel>Godzina*</FormLabel>
                    <FormMessage className="text-sm" />
                  </div>
                  <TimeSelection
                    field={field}
                    times={validTimes?.filter((time) => isSameDay(time, date))}
                    disabled={!date}
                    isOpen={isTimeDialogOpen}
                    setIsOpen={setIsTimeDialogOpen}
                    setIsDateDialogOpen={setIsDateDialogOpen}
                  />
                </FormItem>
              );
            }}
          />
        </div>
        {!user && (
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <FormField
              control={form.control}
              name="guestName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex h-5 items-center gap-4">
                    <FormLabel>Imię*</FormLabel>
                    <FormMessage className="text-sm" />
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guestEmail"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex h-5 items-center gap-4">
                    <FormLabel>Email*</FormLabel>
                    <FormMessage className="text-sm" />
                  </div>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}
        <FormField
          control={form.control}
          name="guestNotes"
          render={({ field }) => (
            <FormItem className="relative">
              <NotesDialog field={field} />
            </FormItem>
          )}
        />

        <div className="flex gap-2 sm:justify-end">
          <LoadingButton
            loading={isCreating}
            type="submit"
            className="sm:auto w-full md:w-min"
          >
            Zarezerwuj wizytę
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
