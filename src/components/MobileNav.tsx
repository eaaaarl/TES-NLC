"use client";

import React from "react";
import { SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import {
  Album,
  BookText,
  ChartBarBig,
  ContactRound,
  Home,
  LayoutPanelTop,
  LineChart,
  Package,
  User,
  UserCog,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;
  return (
    <SheetContent side="left" className="flex flex-col ">
      <nav className="grid gap-2 text-lg font-medium">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full shadow-md"></div>
            <Image
              src="/assets/nemsu-logo.png"
              alt="Northern Eastern Mindanao State University"
              width={50}
              height={50}
              className="relative z-10 shadow-xl rounded-full border-white"
            />
          </div>
          <span className="text-lg">NEMSU LC</span>
        </Link>
        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive("/admin/dashboard")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          }`}
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href=""
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive("/admin/students")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          }`}
        >
          <User className="h-4 w-4" />
          Students
        </Link>
        <Link
          href=""
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive("/admin/facultys")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          }`}
        >
          <UserCog className="h-4 w-4" />
          Faculty
        </Link>
        <Link
          href="/admin/courses"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive("/admin/courses")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          }`}
        >
          <Album className="h-4 w-4" />
          Courses
        </Link>
        <Link
          href="/admin/subjects"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive("/admin/subjects")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          }`}
        >
          <BookText className="h-4 w-4" />
          Subjects
        </Link>
        <Link
          href="/admin/sections"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive("/admin/sections")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          }`}
        >
          <LayoutPanelTop className="h-4 w-4" />
          Sections
        </Link>
        <Link
          href=""
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive("/admin/accounts")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          }`}
        >
          <ContactRound className="h-4 w-4" />
          Accounts
        </Link>
        <Link
          href=""
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive("/admin/evaluations")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          }`}
        >
          <ChartBarBig className="h-4 w-4" />
          Evaluations
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive("/admin/reports")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          }`}
        >
          <Package className="h-4 w-4" />
          Reports
        </Link>
        <Link
          href="#"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            isActive("/admin/analytics")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          }`}
        >
          <LineChart className="h-4 w-4" />
          Analytics
        </Link>
      </nav>
    </SheetContent>
  );
}
