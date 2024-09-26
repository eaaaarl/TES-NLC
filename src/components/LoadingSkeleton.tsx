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
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-48" />
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Skeleton className="h-9 w-16" />
                <Skeleton className="h-9 w-20" />
              </div>
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
