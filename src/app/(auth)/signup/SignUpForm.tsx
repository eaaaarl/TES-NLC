"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function SignUpForm() {
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
      streetAddress: "",
      barangay: "",
      city: "",
      state_province: "",
      postal_code: "",
      password: "",
      confirm_password: "",
    },
  });

  const signup = async (payload: StudentValues) => {
    console.log(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(signup)} className="space-y-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-1 w-full"
                        placeholder="First name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="middlename"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-1 w-full"
                        placeholder="Middle Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="mt-1 w-full"
                        placeholder="Last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Student Number */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="studentID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1 w-full"
                      placeholder="Student ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="yearlevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Level</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Select Year Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Degree Program */}
        <FormField
          control={form.control}
          name="degreeProgram"
          render={({ field }) => <SelectCourse field={field} />}
        />

        {/* Email */}
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="mt-1 w-full"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Phone Number */}
        <div>
          <FormField
            control={form.control}
            name="contact_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact No</FormLabel>
                <FormControl>
                  <Input
                    className="mt-1 w-full"
                    placeholder="Contact No"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => <BirthDate field={field} />}
          />
          <FormMessage />
        </div>

        <Address form={form} />

        <div className="mt-4">
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="mt-1 w-full"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="mt-1 w-full"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
          Create an account
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
