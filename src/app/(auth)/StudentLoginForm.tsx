"use client";

import InputFields from "@/components/InputFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { studentLoginSchema, StudentLoginValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "./action";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function StudentLoginForm() {
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(studentLoginSchema),
    defaultValues: {
      studentID: "",
      password: "",
    },
  });

  const Login = async (payload: StudentLoginValues) => {
    startTransition(async () => {
      const { success, error } = await login(payload);
      if (success) {
        router.push("/students/dashboard");
        form.reset();
      } else {
        toast({
          title: "Failed to sign in",
          variant: "destructive",
          description: error,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(Login)} className="space-y-6">
        <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700"
          >
            Student ID
          </label>
          <InputFields
            name="studentID"
            control={form.control}
            className="mt-1 text-base"
            types="text"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <InputFields
            name="password"
            control={form.control}
            className="mt-1 text-base"
            types="password"
          />
        </div>
        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Forgot Password?
          </a>
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="w-full bg-blue-900 hover:bg-blue-800"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
