"use client";

import { CourseValues } from "@/lib/validation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { courseSchema } from "@/lib/validation";
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
import { useCreateCourseSchema } from "./mutation";
import { useToast } from "@/hooks/use-toast";

export default function CreateModalForm() {
  const { toast } = useToast();
  const [error, setError] = useState<string>();
  const form = useForm<CourseValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: "",
    },
  });
  const { mutate, status } = useCreateCourseSchema();

  const SubmitCourse = async (values: CourseValues) => {
    setError(undefined);
    mutate(values, {
      onSuccess: () => {
        toast({ description: "Course created." });
      },
    });
    form.reset();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Create Course</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a New Course</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the course details below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(SubmitCourse)}>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <FormField
              name="courseName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Course Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className="mt-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
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
