"use client";
import Pagination from "@/components/Pagination"; // Ensure this path is correct
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchStudent } from "./action";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useDeleteStudent } from "./mutation";
import { useToast } from "@/hooks/use-toast";

export default function StudentTable() {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ["students", page, pageSize, debouncedSearch],
    queryFn: () => fetchStudent(page, pageSize, debouncedSearch),
  });

  const { mutate, status } = useDeleteStudent();
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      mutate(id, {
        onSuccess: () => {
          toast({
            description: "Student Deleted.",
          });
        },
      });
    }
  };
  if (!mounted) return null;

  const totalEntries = data?.meta.total || 0;
  const totalPages = data?.meta.pageCount || 0;

  return (
    <>
      <div className="mb-4 flex justify-between items-center space-x-4">
        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            setPageSize(parseInt(value));
            setPage(1); // Reset to the first page when pageSize changes
          }}
        >
          <SelectTrigger className="w-18">
            <SelectValue placeholder="Page Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[200px]"
        />
      </div>

      {/* Table for larger screens */}
      <Table className="hidden lg:table">
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead className="hidden lg:table-cell">Full Name</TableHead>
            <TableHead className="hidden lg:table-cell">Year Level</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: pageSize }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Skeleton className="h-9 w-16" />
                    <Skeleton className="h-9 w-20" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : data?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-destructive">
                No Students available.
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((student) => (
              <TableRow key={student.studentID}>
                <TableCell>{student.studentID}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {student.firstname} {student.middlename} {student.lastname}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {student.yearlevel}
                </TableCell>
                <TableCell>{student.course.courseDep}</TableCell>
                <TableCell>
                  <Badge variant={"destructive"}>{student.status}</Badge>
                </TableCell>
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
                      <DropdownMenuItem
                        onClick={() => handleDelete(String(student.id))}
                        className="text-red-600"
                        disabled={status === "pending"}
                      >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Mobile version */}
      <div className="lg:hidden">
        {isLoading ? (
          Array.from({ length: pageSize }).map((_, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md shadow">
              <Skeleton className="h-4 mb-2" />
              <Skeleton className="h-4 mb-2" />
              <Skeleton className="h-4 mb-2" />
            </div>
          ))
        ) : data?.data.length === 0 ? (
          <div className="text-center text-destructive">
            No Students available.
          </div>
        ) : (
          data?.data.map((student) => (
            <Card key={student.studentID} className="mb-4">
              <CardHeader>
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">
                    {student.firstname} {student.middlename} {student.lastname}
                  </h3>
                  <Badge variant={"destructive"}>{student.status}</Badge>
                </div>
                <span className="text-sm text-muted-500">
                  Student ID: {student.studentID}
                </span>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <strong>Year Level:</strong> {student.yearlevel}
                </div>
                <div className="mb-2">
                  <strong>Department:</strong> {student.course.courseDep}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Eye className="mr-2" /> View
                  </Button>
                  <Button variant="outline">
                    <Edit className="mr-2" /> Edit
                  </Button>
                  <Button variant="outline" className="text-red-600">
                    <Trash className="mr-2" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between">
        <div>
          {isLoading ? (
            <Skeleton className="h-4 w-64" />
          ) : (
            `Showing ${(page - 1) * pageSize + 1} to ${Math.min(
              page * pageSize,
              totalEntries
            )} of ${totalEntries} entries`
          )}
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
