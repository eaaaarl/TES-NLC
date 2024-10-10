"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
import { useForm } from "react-hook-form";
import { useCreateSubject } from "./mutation";
import { Loader2 } from "lucide-react";
export default function CreateSubjectModalForm() {
  const form = useForm<SubjectValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      subjectName: "",
    },
  });
  const { mutateAsync, isPending } = useCreateSubject();
  const SubmitSubject = async (values: SubjectValues) => {
    await mutateAsync(values);
    form.reset();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Create Subject</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a new subjects</AlertDialogTitle>
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
                    <Input
                      className="text-base"
                      type="text"
                      placeholder="Enter subject name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter className="mt-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
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
