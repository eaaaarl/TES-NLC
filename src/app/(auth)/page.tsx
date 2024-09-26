import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEMSU LC STUDENT LOGIN",
};

const LoginStudentPage = () => {
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
        <CardHeader className="bg-blue-900 text-white text-center py-3">
          <h2 className="text-lg sm:text-xl font-semibold">STUDENT LOGIN</h2>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700"
              >
                Student ID
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
              className="w-full bg-blue-900 hover:bg-blue-800"
            >
              Sign In
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginStudentPage;
