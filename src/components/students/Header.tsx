"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  CircleUser,
  ClipboardList,
  Home,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import TooltipLink from "./TooltipLink";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogoutMenuItem from "./LogoutButton";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex">
        <div
          className={`fixed inset-y-0 left-0 z-20 w-14 bg-blue-900 border-r transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out sm:translate-x-0 sm:flex`}
        >
          <nav className="flex h-full flex-col items-center gap-4 px-2 py-4">
            <Link href="/students/dashboard" className="mb-6">
              <div className="rounded-full bg-white shadow-lg">
                <Image
                  src="/assets/nemsu-logo.png"
                  height={40}
                  width={40}
                  className="h-auto w-auto"
                  alt="Nemsu Logo"
                />
              </div>
            </Link>

            <TooltipLink href="/students/dashboard" content="Home">
              <Home className="h-5 w-5 text-gray-300" />
            </TooltipLink>

            <TooltipLink href="/students/evaluation" content="Evaluation">
              <ClipboardList className="h-5 w-5 text-gray-300" />
            </TooltipLink>

            <TooltipLink href="#" content="Settings">
              <Settings className="h-5 w-5 text-gray-300" />
            </TooltipLink>
          </nav>
        </div>

        <div
          className={`flex-1 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-14" : ""
          } sm:translate-x-0`}
        >
          <div className="sm:hidden">
            <Button size="icon" variant="outline" onClick={toggleSidebar}>
              <Home className="h-6 w-6" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </div>
        </div>
      </div>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Product</BreadcrumbPage>
          </BreadcrumbItem> */}
        </BreadcrumbList>
      </Breadcrumb>
      <div
        className={`relative ml-auto flex-1 md:grow-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-14" : ""
        }`}
      >
        <div
          className={`relative w-full flex items-center transition-all duration-300 ease-in-out ${
            isOpen ? "w-[calc(100%-35px)] z-10" : "w-full"
          }`}
        >
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="ml-3 rounded-full "
            >
              {/* <Image
                src="/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              /> */}
              <CircleUser className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutMenuItem />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
