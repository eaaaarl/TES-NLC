/* eslint-disable react/no-unescaped-entities */

import React from "react";
import { Button } from "../../../components/ui/button";
import { UserTable } from "./UserTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export default function MainContent() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">List of User's</h1>
        <Link href="/customers/add">
          <Button>Add Product</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>Manage your user's.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable />
        </CardContent>
      </Card>
    </main>
  );
}
