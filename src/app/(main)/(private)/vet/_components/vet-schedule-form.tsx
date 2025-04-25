"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";
import {
  scheduleFormSchema,
  type ScheduleFormSchema,
} from "@/lib/schema/schedule-schema";
import { groupBy, timeToInt } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mapDayOfWeek } from "@/lib/schema/map-day-of-week";
import LoadingButton from "@/components/loading-button";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type Availability = {
  startTime: string;
  endTime: string;
  dayOfWeek: (typeof DAYS_OF_WEEK_IN_ORDER)[number];
};

export function VetScheduleForm({
  schedule,
}: {
  schedule?: {
    availabilities: Availability[];
  };
}) {
  const router = useRouter();
  const form = useForm<ScheduleFormSchema>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      availabilities: schedule?.availabilities.sort((a, b) => {
        return timeToInt(a.startTime) - timeToInt(b.startTime);
      }),
    },
  });

  const {
    append: addAvailability,
    remove: removeAvailability,
    fields: availabilityFields,
  } = useFieldArray({ name: "availabilities", control: form.control });

  const groupedAvailabilityFields = groupBy(
    availabilityFields.map((field, index) => ({ ...field, index })),
    (availability) => availability.dayOfWeek,
  );

  const { mutate: saveSchedule, isPending: isSubmitting } =
    api.vet.schedule.saveSchedule.useMutation({
      onSuccess: () => {
        toast.success("Grafik został zapisany");
        router.push("/vet/schedule");
      },
      onError: () => {
        toast.error(
          "Wystąpił błąd podczas zapisywania grafiku. Spróbuj ponownie.",
        );
      },
    });

  async function onSubmit(values: ScheduleFormSchema) {
    saveSchedule(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 rounded-lg"
      >
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {DAYS_OF_WEEK_IN_ORDER.map((dayOfWeek) => (
            <div
              className="flex min-h-full w-70 flex-col space-y-2 rounded-xl border p-4 pb-2"
              key={dayOfWeek}
            >
              <div className="flex items-center justify-between">
                <div className="min-w-[100px] text-sm font-semibold capitalize">
                  {mapDayOfWeek(dayOfWeek)}
                </div>
              </div>
              <div className="flex min-h-10 flex-grow flex-col gap-2">
                {groupedAvailabilityFields[dayOfWeek] ? (
                  groupedAvailabilityFields[dayOfWeek].map(
                    (field, labelIndex) => (
                      <div className="flex flex-col gap-1" key={field.id}>
                        <div className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`availabilities.${field.index}.startTime`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-24"
                                    aria-label={`${dayOfWeek} Start Time ${
                                      labelIndex + 1
                                    }`}
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          -
                          <FormField
                            control={form.control}
                            name={`availabilities.${field.index}.endTime`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-24"
                                    aria-label={`${dayOfWeek} End Time ${
                                      labelIndex + 1
                                    }`}
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            className="size-6 p-1"
                            variant="destructive"
                            onClick={() => removeAvailability(field.index)}
                          >
                            <X />
                          </Button>
                        </div>
                        <FormMessage>
                          {
                            form.formState.errors.availabilities?.at?.(
                              field.index,
                            )?.message
                          }
                        </FormMessage>
                      </div>
                    ),
                  )
                ) : (
                  <div className="text-muted-foreground grid flex-grow place-items-center">
                    Brak dostępności
                  </div>
                )}
              </div>
              <Button
                type="button"
                className="w-full p-1"
                variant="outline"
                onClick={() => {
                  addAvailability({
                    dayOfWeek,
                    startTime:
                      [...form.getValues("availabilities")]
                        .reverse()
                        .find((a) => a.dayOfWeek === dayOfWeek)?.endTime ??
                      "09:00",
                    endTime: "17:00",
                  });
                }}
              >
                <Plus />
                Dodaj dostępność
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            disabled={!form.formState.isDirty || isSubmitting}
          >
            Zapisz zmiany
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
