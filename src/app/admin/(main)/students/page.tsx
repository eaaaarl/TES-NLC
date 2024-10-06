import React from "react";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import StudentTable from "./StudentTable";

export const metadata: Metadata = {
  title: "TES-NLC | STUDENT",
  description:
    "The Teacher Faculty Evaluation System for the North Eastern Mindanao State University, Lianga Campus (NEMSU LC)",
};
export default function StudentPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          {"List of Student's"}
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>{"Manage student's"}</CardDescription>
        </CardHeader>
        <CardContent>
          <StudentTable />
        </CardContent>
      </Card>
    </main>
  );
}
