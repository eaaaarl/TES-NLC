"use client";
import React, { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CircleUser, Lock, LogOut, User } from "lucide-react";
import { useSession } from "@/app/students/(main)/SessionProvider";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import ChangePassword from "./ChangePassword";
import { useRouter } from "next/navigation";
import { logout } from "@/app/(auth)/Logout";

export default function ProfileStudent() {
  const [pending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const openModal = () => setIsDialogOpen(true);
  const router = useRouter();

  const { studentInfo, loading, error } = useSession();
  if (error) return <div>Error: {error}</div>;
  const fullname = studentInfo?.firstname + " " + studentInfo?.lastname;

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
      router.push("/");
    });
  };

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
            {loading ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <>
                <User className="mr-2 " /> Profile
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openModal}>
            {loading ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <>
                <Lock className="mr-2" /> Change Password
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} disabled={pending}>
            <LogOut className="mr-2" />
            {pending ? "Please wait" : "Logout"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangePassword onOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
