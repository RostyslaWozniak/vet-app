import type { SelectableServiceType } from "../select-vet-services";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiSelect } from "@/components/multi-select";
import LoadingButton from "@/components/loading-button";
import { VetServicesSchema } from "@/server/modules/vet/vet-services/vet-services.schema";
import type { VetServicesMutateListType } from "@/server/modules/vet/vet-services/vet-services.types";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SelectVetServicesFormProps = {
  services: SelectableServiceType[];
  setIsSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function SelectVetServicesForm({
  services,
  setIsSelectOpen,
}: SelectVetServicesFormProps) {
  const router = useRouter();

  const { mutate: mutateList, isPending } =
    api.vet.service.mutateList.useMutation({
      onSuccess: () => {
        toast.success("Usługi zostały zaktualizowane");
        router.refresh();
        setIsSelectOpen(false);
      },
      onError: () => {
        toast.error("Coś poszło nie tak. Spróbuj ponownie.");
        setIsSelectOpen(false);
      },
    });

  const form = useForm<VetServicesMutateListType>({
    resolver: zodResolver(VetServicesSchema.mutateList),
    defaultValues: {
      services: services.filter((s) => s.isChosen).map((s) => s.id),
    },
  });

  async function onSubmit(data: VetServicesMutateListType) {
    mutateList(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-3 p-5"
      >
        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem>
              <FormControl className="sm:min-w-100">
                <MultiSelect
                  className="w-full items-start"
                  options={services.map((service) => ({
                    value: service.id,
                    label: service.name,
                  }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Wybierz usługi"
                  variant="inverted"
                  maxCount={10}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          variant="default"
          type="submit"
          className="w-full sm:w-full"
          loading={isPending}
          disabled={!form.formState.isDirty || isPending}
        >
          Zapisz
        </LoadingButton>
      </form>
    </Form>
  );
}
