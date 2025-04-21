"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusSquare } from "lucide-react";
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
        className="sm:w-150"
      >
        <Textarea className="h-32 resize-none" {...field} />
        <Button onClick={() => setIsOpen(false)} className="float-right mt-4">
          Ok
        </Button>
      </DialogWrapper>
      <Button
        type="button"
        variant="link"
        className="text-muted-foreground"
        onClick={() => setIsOpen(true)}
      >
        <PlusSquare />
        Dodaj opis (opcjonalne)
      </Button>
    </>
  );
}
