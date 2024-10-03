"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogoutMenuItem from "./LogoutButton";
import { Button } from "../ui/button";
import { CircleUser, Loader2 } from "lucide-react";
import { useSession } from "@/app/students/(main)/SessionProvider";
import Image from "next/image";

export default function ProfileStudent() {
  const { studentInfo, loading, error } = useSession();
  if (loading) return <Loader2 className="h-5 w-5 animate-spin" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="ml-3 rounded-full">
          {studentInfo?.avatarUrl ? (
            <Image
              src={studentInfo.avatarUrl}
              alt="Avatar"
              className="h-5 w-5 rounded-full"
            />
          ) : (
            <CircleUser className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {studentInfo?.firstname} {studentInfo?.lastname}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutMenuItem />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
