import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Metadata } from "next";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "NEMSU LC FACULTY LOGIN",
};

const LoginFacultyPage = async () => {
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
        <div className="flex items-center justify-center  p-6 rounded-t-lg">
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

      <Card className="mt-0 mx-4 sm:mx-auto sm:w-full sm:max-w-md rounded-md shadow-md">
        <CardHeader className="bg-gray-900 text-white text-center py-3">
          <h2 className="text-lg sm:text-xl font-semibold">FACULTY LOGIN</h2>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700"
              >
                Faculty ID
              </label>
              <Input id="id" name="id" type="text" required className="mt-1" />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1"
              />
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot Password?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-900 hover:bg-blue-800"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginFacultyPage;
