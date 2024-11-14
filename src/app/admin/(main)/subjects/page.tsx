"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React, { useState } from "react";
import SubjectTable from "./SubjectTable";
import SubjectModalForm from "./SubjectModalForm";
import { Button } from "@/components/ui/button";

export default function SubjectsPage() {
  const [onOpen, setOnOpen] = useState<boolean>(false);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="justify-between items-center flex">
        <h1 className="text-lg font-semibold md:text-2xl">
          {"List of Subject's"}
        </h1>
        <Button onClick={() => setOnOpen(true)}>Create Subject</Button>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>{"Manage Subject's"}</CardDescription>
        </CardHeader>
        <CardContent>
          <SubjectTable />
        </CardContent>
      </Card>

      <SubjectModalForm
        open={onOpen}
        onClose={() => setOnOpen(false)} />
    </main>
  );
}
