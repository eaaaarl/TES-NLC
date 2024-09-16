/* eslint-disable react/no-unescaped-entities */
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateStudentSchema } from "./mutation";
import { Loader2 } from "lucide-react";

export default function AddUserForm() {
  const [error, setError] = useState<string>();
  const form = useForm<UserValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      studentID: "",
      fullname: "",
      status: "",
    },
  });
  const { mutateAsync, status } = useCreateStudentSchema();
  async function onSubmit(values: UserValues) {
    setError(undefined);
    try {
      await mutateAsync(values);
      form.reset();
    } catch (err) {
      if (err instanceof Error) {
        setError("The Student ID already exists.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Add User's</h1>
      </div>
      <Card>
        <CardContent className="py-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <FormField
                control={form.control}
                name="studentID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter studentID" {...field} />
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
                      <Input placeholder="Enter fullname" {...field} />
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
                      <Input placeholder="Enter status" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-3"
                disabled={status === "pending"}
              >
                {status === "pending" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
