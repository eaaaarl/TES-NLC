"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { CircleUser, Menu, Search } from "lucide-react";
import MobileNav from "./MobileNav";
import LogoutButton from "./LogoutButton";
import { ModeToggle } from "./ToggleMode";

interface AdminInfo {
  fullname: string;
  email: string;
}

export default function Header() {
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  useEffect(() => {
    const getAdminInfo = async () => {
      try {
        const response = await fetch(`/api/admin/auth/get`);
        if (response.ok) {
          const data = await response.json();
          setAdminInfo(data);
        }
      } catch (error) {
        console.error("Failed to fetch admin info:", error);
      }
    };

    getAdminInfo();
  }, []);
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {/* Mobile menu button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <MobileNav />
      </Sheet>

      {/* Search bar */}
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Global Search..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3 text-base"
            />
          </div>
        </form>
      </div>

      {/* Dark/Light Mode Toggle */}
      <ModeToggle />

      {/* User dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* Display user email or placeholder */}
          <DropdownMenuLabel>
            {adminInfo?.fullname || "Loading..."}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
