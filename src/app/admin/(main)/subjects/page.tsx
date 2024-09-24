import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

export default function SubjectsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="justify-between items-center flex">
        <h1 className="text-lg font-semibold md:text-2xl">
          {"List of Subject's"}
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>{"Manage Subject's"}</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </main>
  );
}
