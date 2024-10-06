"use client";
import React, { useState } from "react";
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
import { CircleUser, Lock, LogOut, User } from "lucide-react";
import { useSession } from "@/app/students/(main)/SessionProvider";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import ChangePassword from "./ChangePassword";
import { useRouter } from "next/navigation";

export default function ProfileStudent() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const openModal = () => setIsDialogOpen(true);
  const router = useRouter();

  const { studentInfo, loading, error } = useSession();
  if (error) return <div>Error: {error}</div>;
  const fullname = studentInfo?.firstname + " " + studentInfo?.lastname;
  return (
    <>
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
          <DropdownMenuLabel className="text-md">
            {loading ? <Skeleton className="h-4 w-full" /> : fullname}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/students/profile")}>
            <User className="mr-2 " />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openModal}>
            <Lock className="mr-2" />
            Change Password
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2" />
            <LogoutMenuItem />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangePassword onOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
