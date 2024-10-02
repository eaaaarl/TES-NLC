import { validateRequest } from "@/auth";
import Header from "@/components/students/Header";
import Sidebar from "@/components/students/Sidebar";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "TES-NLC",
  description:
    "The Teacher Faculty Evaluation System for the North Eastern Mindanao State University, Lianga Campus (NEMSU LC)",
};
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/not-found");
  if (user.Role !== "STUDENT") return redirect("/unauthorized");
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
