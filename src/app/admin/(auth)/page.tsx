import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full shadow-md"></div>
            <Image
              src="/assets/nemsu-logo.png"
              alt="Northern Eastern Mindanao State University"
              width={130}
              height={130}
              className="relative z-10 shadow-2xl rounded-full border-4 border-white"
            />
          </div>
          <CardTitle className="text-2xl mt-4">TES-NLC</CardTitle>
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
