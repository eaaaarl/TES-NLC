"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Bell, Home, LineChart, Package, Package2, Users } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname(); // Get current route

  // Function to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">TES NLC</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/dashboard")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/products")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Package className="h-4 w-4" />
              Reports
            </Link>
            <Link
              href="/customers"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/customers")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              User
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/analytics")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
