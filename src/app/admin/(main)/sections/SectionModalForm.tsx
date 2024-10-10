import InputFields from "@/components/InputFields";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { sectionSchema, SectionValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useCreateSection } from "./mutation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface SectionModalFormProps {
  onOpen: boolean;
  onClose: () => void;
}

export default function SectionModalForm({
  onOpen,
  onClose,
}: SectionModalFormProps) {
  const { toast } = useToast();
  const form = useForm<SectionValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      sectionName: "",
    },
  });
  const { mutate, status } = useCreateSection();
  function handleSubmit(payload: SectionValues) {
    mutate(payload, {
      onSuccess: () => {
        toast({
          description: "Section created.",
        });
        form.reset();
      },
    });
  }

  return (
    <AlertDialog open={onOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a new Sections</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the sections details below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputFields
              types="text"
              label="Section Name"
              control={form.control}
              name="sectionName"
            />

            <AlertDialogFooter className="mt-3">
              <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={status === "pending"}>
                {status === "pending" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
