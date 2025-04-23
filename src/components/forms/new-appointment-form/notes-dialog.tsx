"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Edit, PlusSquare } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";

type NotesDialogProps = {
  field: ControllerRenderProps<
    {
      startTime: Date;
      date: Date;
      guestEmail: string;
      guestName: string;
      guestNotes?: string | undefined;
    },
    "guestNotes"
  >;
};

export function NotesDialog({ field }: NotesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Opis (opcjonalne)"
        description="Dodaj opis"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        contentClassName="max-h-[80vh] md:min-w-200 pb-0 md:pb-4"
      >
        <Textarea {...field} className="h-32 resize-none" autoFocus />
        <Button
          onClick={() => {
            setIsOpen(false);
            scrollTo(0, 120);
          }}
          className="float-right mt-4 w-full lg:w-min"
        >
          Ok
        </Button>
      </DialogWrapper>
      <div className="grid gap-y-4">
        <FormLabel>Opis (opcjonalne)</FormLabel>

        {!field.value?.length ? (
          <Button
            type="button"
            variant="outline"
            className="text-muted-foreground border-foreground flex justify-between"
            onClick={() => setIsOpen(true)}
          >
            Dodaj opis
            <PlusSquare className="ml-auto h-4 w-4 opacity-60" />
          </Button>
        ) : (
          <>
            <p className="text-muted-foreground line-clamp-2">{field.value}</p>
            <Button
              type="button"
              variant="link"
              className="text-primary absolute -top-2.5 -right-2 text-xs lg:text-sm"
              onClick={() => setIsOpen(true)}
            >
              <Edit />
              Edytuj
            </Button>
          </>
        )}
      </div>
    </>
  );
}
