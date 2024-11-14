"use client";

import React, { useEffect, useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import { PasswordInput } from "@/components/PasswordInput";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSignUp } from "./mutation";
import { Input } from "@/components/ui/input";

import { Department } from "@/lib/types";
import { getDepartmentByCourse } from "./action";
import SelectSections from "@/components/sections/SelectSections";
import SelectYearLevel from "@/components/sections/SelectYearLevel";

export default function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [yearlevelId, setYearLevelId] = useState("");
  const [departments, setDepartments] = useState<Department | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  const form = useForm<StudentValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      studentID: "",
      yearlevel: "",
      sectionId: "",
      departmentId: "",
      courseId: "",
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
  const { reset } = form;

  useEffect(() => {
    const getDepartment = async () => {
      if (selectedCourseId) {
        const result = await getDepartmentByCourse(selectedCourseId);
        setDepartments(result);
        if (result && result.id) {
          form.setValue("departmentId", result.id);
        }
      }
    };
    getDepartment();
  }, [selectedCourseId, form]);

  const { mutate, status } = useSignUp();
  const signup = async (payload: StudentValues) => {
    setError(undefined);
    mutate(payload, {
      onSuccess: ({ data, success }) => {
        if (success) {
          router.push("/students/dashboard");
          reset();
          return;
        } else {
          setError(data.error);
          toast({
            title: "Failed to signup",
            description: data.error,
            variant: "destructive",
          });
        }
      },
    });
  };

  const handleYearLevelChange = (yearLevelId: string) => {
    setYearLevelId(yearLevelId);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(signup)} className="space-y-6">
        {error && <p className="text-center text-destructive">{error}</p>}
        <Alert>
          <AlertTitle>Registration Limited</AlertTitle>
          <AlertDescription>
            Registration is currently limited. Please try again later.
          </AlertDescription>
        </Alert>
        <div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <InputFields
                label="First name"
                name="firstname"
                control={form.control}
                className="mt-1 w-full text-base"
              />
            </div>
            <div className="flex-1">
              <InputFields
                label="Middle name"
                name="middlename"
                control={form.control}
                className="mt-1 w-full text-base"
              />
            </div>
            <div className="flex-1">
              <InputFields
                label="Last name"
                name="lastname"
                control={form.control}
                className="mt-1 w-full text-base"
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

        <InputFields
          name="studentID"
          label="Student ID"
          control={form.control}
          className="mt-1 w-full text-base"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <SelectCourse
                  field={field}
                  onCourseChange={setSelectedCourseId}
                />
              )}
            />
          </div>
          <div>
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Input value={departments?.departmentName ?? ""} className="bg-gray-300" readOnly />
            </FormItem>
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <Input
                  {...field}
                  value={departments ? departments.id : ""}
                  type="hidden"
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="yearlevel"
              render={({ field }) => (
                <SelectYearLevel
                  onYearLevelChange={handleYearLevelChange}
                  field={field}
                />
              )}
            />
          </div>

          <div className="flex-1">
            <FormField
              control={form.control}
              name="sectionId"
              render={({ field }) => (
                <SelectSections
                  field={field}
                  departmentId={departments?.id || ""}
                  yearLevelId={yearlevelId ?? ""}
                  disabled={!yearlevelId || !departments}
                  onSectionChange={(sectionId) => {
                    sectionId;
                  }}
                />
              )}
            />
          </div>
        </div>

        <div>
          <InputFields
            name="email"
            label="Email"
            types="email"
            control={form.control}
            className="mt-1 w-full text-base"
          />
        </div>

        <div>
          <InputFields
            name="contact_no"
            label="Mobile Phone"
            placeHolder="09XXXXXXXXX"
            control={form.control}
            className="mt-1 w-full text-base"
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
                    <PasswordInput className="text-base" {...field} />
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
                    <PasswordInput className="text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
          {status === "pending" ? (
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
