"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
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
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-5">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full shadow-md"></div>
              <Image
                src="/assets/nemsu-logo.png"
                alt="Northern Eastern Mindanao State University"
                width={60}
                height={60}
                className="relative z-10 shadow-xl rounded-full  border-white"
              />
            </div>
            <span className="text-sm text-center">
              Northern Eastern Mindanao State University
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
              href="/admin/students"
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
              href="/admin/faculty"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/admin/faculty")
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
                isActive("/admin/products")
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
