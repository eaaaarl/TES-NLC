"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/(auth)/Logout";

export default function LogoutMenuItem() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleLogout() {
    router.push("/");

    startTransition(async () => {
      try {
        await logout();
      } catch (error) {
        console.error("Logout failed:", error);
      }
    });
  }

  return (
    <div
      onClick={handleLogout}
      role="button"
      tabIndex={0}
      className="cursor-pointer"
    >
      {isPending ? "Logging out..." : "Logout"}
    </div>
  );
}
