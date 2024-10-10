/* eslint-disable prefer-const, @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { fetchCourses } from "./action";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteCourse } from "./mutation";
import { EditModalForm } from "./EditModalForm";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Pagination from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";

export default function Course() {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [mounted, setMounted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const { mutate: deleteCourse } = useDeleteCourse();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ["courses", page, pageSize, debouncedSearch],
    queryFn: () => fetchCourses(page, pageSize, debouncedSearch),
  });

  const totalPages = data?.meta.pageCount || 0;

  const handleEdit = (course: any) => {
    setSelectedCourse(course);
    setOpenModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      deleteCourse(id, {
        onSuccess: () => {
          toast({ description: "Course deleted." });
        },
      });
    }
  };
  console.log(data);
  if (!mounted) return null;

  return (
    <>
      <div className="mb-4 flex justify-between items-center space-x-4">
        <Select
          value={String(pageSize)}
          onValueChange={(value) => setPageSize(parseInt(value))}
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
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[180px] text-base"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <LoadingSkeleton pageSize={pageSize} />
          ) : data?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-destructive">
                No courses available.
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((course) => (
              <TableRow key={course.course_id}>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.Department.departmentName}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(course)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(course.course_id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-between items-center">
        <div className="hidden md:block">
          {isLoading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            `Showing ${(page - 1) * pageSize + 1} to ${Math.min(
              page * pageSize,
              data?.meta.total
            )} of ${data?.meta.total} entries`
          )}
        </div>
        <div className="flex md:justify-end justify-center  w-full">
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            isLoading={isLoading}
          />
        </div>
      </div>

      {selectedCourse && (
        <EditModalForm
          course={selectedCourse}
          onOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
