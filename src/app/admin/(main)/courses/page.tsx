import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import CreateModalForm from "./CreateModalForm";
import Course from "./Course";

export default function CoursePage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          {"List of Course's"}
        </h1>
        <CreateModalForm />
      </div>
      <Card>
        <CardHeader>
          <CardDescription>{"Manage course's"}</CardDescription>
        </CardHeader>
        <CardContent>
          <Course />
        </CardContent>
      </Card>
    </main>
  );
}
