
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const SectionTableLoadingSkeleton = ({ rowCount = 5 }) => {
    return (
        <div>
            {/* Table controls skeleton */}
            <div className="mb-4 flex justify-between items-center space-x-4">
                <Skeleton className="h-10 w-[100px]" /> {/* Page size select */}
                <Skeleton className="h-10 w-[180px]" /> {/* Search input */}
            </div>

            {/* Table skeleton */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Skeleton className="h-4 w-[120px]" /></TableHead>
                        <TableHead><Skeleton className="h-4 w-[100px]" /></TableHead>
                        <TableHead><Skeleton className="h-4 w-[80px]" /></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rowCount }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                            <TableCell>
                                <div className="flex justify-end">
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination skeleton */}
            <div className="mt-4 flex justify-between items-center">
                <Skeleton className="h-4 w-[200px]" /> {/* Entries info */}
                <div className="flex space-x-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="h-8 w-8" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectionTableLoadingSkeleton;