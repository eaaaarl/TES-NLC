// File: pages/student-evaluation.tsx

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Importing from shadcn
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TES-NLC | Evaluation",
  description:
    "The Teacher Faculty Evaluation System for the North Eastern Mindanao State University, Lianga Campus (NEMSU LC). This is the student evaluation page, currently in development.",
};

export default function StudentEvaluationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-blue-900 text-white text-center py-6">
          <h2 className="text-2xl font-bold">Student Evaluation</h2>
          <p className="text-sm mt-2">
            Evaluate your teachers and provide feedback on your courses.
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
