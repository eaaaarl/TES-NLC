// File: pages/student-dashboard.tsx

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // shadcn components
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TES-NLC | Home",
  description:
    "The Teacher Faculty Evaluation System for the North Eastern Mindanao State University, Lianga Campus (NEMSU LC). This is the student dashboard page, currently in development.",
};

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-blue-900 text-white text-center py-6">
          <h2 className="text-2xl font-bold">Student Dashboard</h2>
          <p className="text-sm mt-2">
            Manage your evaluations and check your progress here.
          </p>
        </CardHeader>
        <CardContent className="p-10">
          <p className="text-center text-gray-700 text-xl font-semibold">
            Coming Soon: We are currently working on these features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
