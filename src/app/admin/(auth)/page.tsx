import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import LoginForm from "./LoginForm";
import { Metadata } from "next";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "TES-NLC | LOGIN",
  description:
    "The Teacher Faculty Evaluation System for the North Eastern Mindanao State University, Lianga Campus (NEMSU LC)",
};
export default async function LoginPage() {
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
    <div className="flex justify-center items-center min-h-screen overflow-x-hidden md:overflow-x-auto">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full shadow-md"></div>
            <Image
              src="/assets/nemsu-logo.png"
              alt="Northern Eastern Mindanao State University"
              width={140}
              height={140}
              className="relative z-10 shadow-2xl rounded-full  border-white"
            />
          </div>
          <CardTitle className="text-2xl mt-4">
            Teacher Evaluation System <br /> NEMSU-LC
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account. This is the login
            for the administrator.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
