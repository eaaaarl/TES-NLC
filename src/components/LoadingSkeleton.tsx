import React from "react";
import { TableCell, TableRow } from "./ui/table";
import { Skeleton } from "./ui/skeleton";

interface SkeletonProps {
  pageSize: number;
}

export default function LoadingSkeleton({ pageSize }: SkeletonProps) {
  return (
    <>
      {Array(pageSize)
        .fill(0)
        .map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
