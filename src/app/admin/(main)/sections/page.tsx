"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React, { useState } from "react";
import SectionModalForm from "./SectionModalForm";
import { Button } from "@/components/ui/button";
import SectionTable from "./SectionTable";

export default function page() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          {"List of Section's"}
        </h1>
        <Button onClick={handleOpen}>Create Sections</Button>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>{"Manage Section's"}</CardDescription>
        </CardHeader>
        <CardContent>
          <SectionTable />
        </CardContent>
      </Card>

      <SectionModalForm onOpen={open} onClose={handleClose} />
    </main>
  );
}
