"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userSchema, UserValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateStudent } from "./mutation";

async function getStudent(id: string): Promise<{
  success: boolean;
  data: {
    id: string;
    studentID: string;
    fullname: string;
    status: string;
  };
}> {
  const response = await fetch(`/api/students/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch student");
  }
  return response.json();
}

export default function EditFormPage() {
  const params = useParams();
  const studentId = params.id as string;
  const updateStudentMutation = useUpdateStudent();
  const router = useRouter();

  const {
    data: student,
    status,
    isError,
  } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => getStudent(studentId),
  });

  const form = useForm<UserValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      studentID: "",
      fullname: "",
      status: "",
    },
  });

  useEffect(() => {
    if (student && student.success) {
      form.reset({
        studentID: student.data.studentID,
        fullname: student.data.fullname,
        status: student.data.status,
      });
    }
  }, [student, form]);

  // Submit handler
  const onSubmit = (values: UserValues) => {
    updateStudentMutation.mutate(
      { id: studentId, payload: values },
      {
        onSuccess: () => {
          router.push("/customers");
        },
      }
    );
  };

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading student data</div>;
  }

  return (
    <Card>
      <CardContent className="py-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="studentID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-3"
              disabled={updateStudentMutation.isPending}
            >
              {updateStudentMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
