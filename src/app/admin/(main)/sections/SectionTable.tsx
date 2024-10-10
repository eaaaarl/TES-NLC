import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchSection } from "./action";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SectionTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["sections", page, pageSize, search],
    queryFn: () => fetchSection(page, pageSize, search),
  });

  console.log(data);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Section Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from(new Array(2)).map((_, index) => (
                <TableRow key={index}>
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
              ))
            : data?.data.map((sections) => (
                <TableRow key={sections.section_id}>
                  <TableCell>{sections.sectionName}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}
