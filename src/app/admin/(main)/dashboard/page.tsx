import { Button } from "@/components/ui/button";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TES-NLC | DASHBOARD",
  description:
    "The Teacher Faculty Evaluation System for the North Eastern Mindanao State University, Lianga Campus (NEMSU LC)",
};
export default function dashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Dashboard Overview
        </h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Welcome to the Dashboard
          </h3>
          <p className="text-sm text-muted-foreground">
            Get insights and overview of your operations.
          </p>
          <Button className="mt-4">Explore</Button>
        </div>
      </div>
    </main>
  );
}
