"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TooltipLink({
  href,
  content,
  children,
}: {
  children: React.ReactNode;
  content: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={`group flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ease-in-out ${
              isActive(`${href}`)
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-primary hover:text-white"
            } hover:scale-110 md:h-8 md:w-8`}
          >
            {children}
            <span className="sr-only">{content}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
