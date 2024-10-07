import React from "react";

import Image from "next/image";
import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import SignUpForm from "./SignUpForm";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "STUDENT REGISTER",
};

const signUpStudent = async () => {
  const { user } = await validateRequest();

  if (user) {
    if (user.Role === "ADMINISTRATOR") {
      return redirect("/admin/dashboard");
    } else if (user.Role === "FACULTY") {
      return redirect("/faculty/dashboard");
    } else if (user.Role === "STUDENT") {
      return redirect("/students/dashboard");
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center p-6 rounded-t-lg">
          <Image
            src="/assets/nemsu-logo.png"
            height={300}
            width={300}
            className="h-14 w-auto sm:h-16"
            alt="Nemsu Logo"
          />
          <div className="ml-4 text-center">
            <h2 className="text-5xl sm:text-5xl font-bold text-gray-900">
              TES-NLC
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Teacher Evaluation System Northern Eastern Mindanao State
              University - Lianga Campus
            </p>
          </div>
        </div>
      </div>

      <Card className="mt-0 mx-4 sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-md shadow-md">
        <CardHeader className="bg-blue-900 text-white text-center py-3">
          <h2 className="text-lg sm:text-xl font-semibold">
            STUDENT REGISTRATION FORM
          </h2>
        </CardHeader>
        <CardContent className="pt-6">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default signUpStudent;
