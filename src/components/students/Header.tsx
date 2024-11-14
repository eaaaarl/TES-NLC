"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Clipboard, Home, Menu, Search, Settings, User } from "lucide-react"; // Import icons
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import ProfileStudent from "./ProfileStudent";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const breadcrumbMap: Record<string, { icon: React.ReactNode; name: string }> =
    {
      "/students/dashboard": {
        icon: <Home className="h-6 w-6" />,
        name: "Dashboard",
      },
      "/students/evaluation": {
        icon: <Clipboard className="h-6 w-6" />,
        name: "Evaluation",
      },
      "/students/setting": {
        icon: <Settings className="h-6 w-6" />,
        name: "Setting",
      },
      "/students/profile": {
        icon: <User className="h-6 w-6" />,
        name: "Profile",
      },
    };

  const breadcrumb = breadcrumbMap[pathname] || {
    icon: <Home className="h-6 w-6" />,
    name: "Home",
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-3 text-lg font-medium">
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
              href="/students/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                pathname === "/students/dashboard"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/students/evaluation"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                pathname === "/students/evaluation"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Clipboard className="h-5 w-5" />
              Evaluation
            </Link>
            <Link
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                pathname === "/students/setting"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Settings className="h-5 w-5" />
              Setting
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex items-center gap-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            {breadcrumb.icon}
            <span className="font-semibold">{breadcrumb.name}</span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] text-base"
        />
      </div>
      <div>
        <ProfileStudent />
      </div>
    </header>
  );
}
