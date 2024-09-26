/*eslint-disable prefer-const, @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function Pagination({
  page,
  totalPages,
  setPage,
  isLoading,
}: any) {
  const renderPageButtons = useMemo(() => {
    const buttons = [];
    const maxButtons = 7;
    let start = Math.max(1, page - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <Button
          key={i}
          variant={page === i ? "default" : "outline"}
          className="mx-1 px-3 py-1 text-sm"
          onClick={() => setPage(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  }, [setPage, page, totalPages]);

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPage(1)}
        disabled={page === 1 || isLoading}
        className="mr-1"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPage((old: any) => Math.max(old - 1, 1))}
        disabled={page === 1 || isLoading}
        className="mr-1"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {isLoading ? <Skeleton className="h-9 w-32 mx-1" /> : renderPageButtons}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPage((old: any) => Math.min(old + 1, totalPages))}
        disabled={page === totalPages || isLoading}
        className="ml-1"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages || isLoading}
        className="ml-1"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
