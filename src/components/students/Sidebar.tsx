import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ClipboardList, Home, Settings } from "lucide-react";
import TooltipLink from "./TooltipLink";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-blue-900 sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link href="/students/dashboard" className="mb-6">
          <div className="rounded-full bg-white shadow-lg">
            <Image
              src="/assets/nemsu-logo.png"
              height={40}
              width={40}
              className="h-auto w-auto "
              alt="Nemsu Logo"
            />
            <span className="sr-only">
              Northen Eastern Mindanao State University - Lianga Campus
            </span>
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
    </aside>
  );
}
