import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SignUpForm from "./SignUpForm";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
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
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link href="/admin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
