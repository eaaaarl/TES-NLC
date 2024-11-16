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
import { CircleUserRound, Lock, LogOut, User } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import ChangePassword from "./ChangePassword";
import { useRouter } from "next/navigation";
import { logout } from "@/app/(auth)/Logout";
import { useQuery } from "@tanstack/react-query";
import { getStudent } from "@/app/students/(main)/profile/action";

export default function ProfileStudent() {
  const [pending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const openModal = () => setIsDialogOpen(true);
  const router = useRouter();

  const { data: studentInfo, isLoading, isError } = useQuery({
    queryKey: ["students", "profile"],
    queryFn: getStudent,
  });

  if (isError) return <div>Error: {isError}</div>;
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
          {isLoading ? (<Skeleton className="rounded-full h-10 w-10 shadow-lg border" />) : studentInfo?.avatarUrl ?
            (<Button variant="outline" size="icon" className="ml-3 rounded-full h-10 w-10 shadow-lg border">
              <Image
                src={studentInfo.avatarUrl}
                alt="Avatar"
                className="rounded-full"
                width={40}
                height={40}
                quality={75}
                priority={false}
              />
            </Button>
            ) : (
              <CircleUserRound className="h-8 w-8" />)}

        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-md">
            {isLoading ? <Skeleton className="h-4 w-full" /> : fullname}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/students/profile")}>
            {isLoading ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <>
                <User className="mr-2 " /> Profile
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openModal}>
            {isLoading ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <>
                <Lock className="mr-2" /> Change Password
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} disabled={pending}>
            {isLoading ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              <>
                <LogOut className="mr-2" />
                {pending ? "Please wait" : "Logout"}
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangePassword onOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
