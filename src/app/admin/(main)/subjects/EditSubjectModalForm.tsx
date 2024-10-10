import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { subjectSchema, SubjectValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateSubject } from "./mutation";
import { Loader2 } from "lucide-react";

interface Subject {
  subject_id: string;
  subjectName: string;
}

interface EditSubjectModalForm {
  Subject: Subject;
  onOpen: boolean;
  onClose: () => void;
}

export function EditSubjectModalForm({
  Subject,
  onOpen,
  onClose,
}: EditSubjectModalForm) {
  const form = useForm<SubjectValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      subjectName: "",
    },
  });

  useEffect(() => {
    form.reset({
      subjectName: Subject.subjectName,
    });
  }, [form, Subject]);
  const { mutateAsync, isPending } = useUpdateSubject();
  const SubmitSubject = async (values: SubjectValues) => {
    await mutateAsync(
      { subject_id: Subject.subject_id, values },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };
  return (
    <AlertDialog open={onOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Subject</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the subjects details below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(SubmitSubject)}>
            <FormField
              control={form.control}
              name="subjectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name</FormLabel>
                  <FormControl>
                    <Input className="text-base" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter className="mt-3">
              <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
