"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import BirthDate from "@/components/BirthDate";
import SelectCourse from "@/components/course/SelectCourse";
import Address from "@/components/Address";
import { studentSchema, StudentValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputFields from "@/components/InputFields";
import SelectFields from "@/components/SelectFields";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { PasswordInput } from "@/components/PasswordInput";
import { signUpStudent } from "./action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition(); // Track the loading state

  const form = useForm<StudentValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      studentID: "",
      yearlevel: "",
      degreeProgram: "",
      email: "",
      contact_no: "",
      birthdate: "",
      gender: "",
      streetAddress: "",
      barangay: "",
      city: "",
      state_province: "",
      postal_code: "",
      password: "",
      confirm_password: "",
    },
  });

  const { toast } = useToast();
  const { reset } = form;
  const signup = async (payload: StudentValues) => {
    setError(undefined);
    startTransition(async () => {
      const { data, success } = await signUpStudent(payload);
      if (success) {
        toast({
          description: "Successfully Registered!",
        });
        reset();
        router.push("/students/dashboard");
      } else {
        setError(data.error);
        toast({
          variant: "destructive",
          title: "Failed to sign up",
          description: data.error,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(signup)} className="space-y-6">
        {error && <p className="text-center text-destructive">{error}</p>}
        <div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <InputFields
                label="First name"
                name="firstname"
                placeHolder="First Name"
                control={form.control}
                className="mt-1 w-full"
              />
            </div>
            <div className="flex-1">
              <InputFields
                label="Middle name"
                name="middlename"
                placeHolder="Middle Name"
                control={form.control}
                className="mt-1 w-full"
              />
            </div>
            <div className="flex-1">
              <InputFields
                label="Last name"
                name="lastname"
                placeHolder="Last Name"
                control={form.control}
                className="mt-1 w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <InputFields
              name="studentID"
              label="Student ID"
              control={form.control}
              className="mt-1 w-full"
            />
          </div>
          <div className="flex-1">
            <SelectFields
              control={form.control}
              name="yearlevel"
              label="Year Level"
              options={[
                { label: "1st Year", value: "1st Year" },
                { label: "2nd Year", value: "2nd Year" },
                { label: "3rd Year", value: "3rd Year" },
                { label: "4th Year", value: "4th Year" },
              ]}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="degreeProgram"
          render={({ field }) => <SelectCourse field={field} />}
        />

        <div>
          <InputFields
            name="email"
            label="Email"
            types="email"
            control={form.control}
            className="mt-1 w-full"
          />
        </div>

        <div>
          <InputFields
            name="contact_no"
            label="Contact No"
            control={form.control}
            className="mt-1 w-full"
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <BirthDate field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Address form={form} />

        <div className="mt-4">
          <div>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              name="confirm_password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={true}
          className="w-full bg-blue-900 hover:bg-blue-800"
        >
          {pending ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="animate-spin h-4 w-4" />
            </div>
          ) : (
            "Create an account"
          )}
        </Button>
        <div className="mt-4 text-center text-sm">
          {"Already have an account?"}{" "}
          <Link href="/" className="underline">
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
}
