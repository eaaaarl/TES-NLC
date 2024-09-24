/* eslint-disable prefer-const, @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState, useMemo } from "react";
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
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
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

const Pagination = ({ page, totalPages, setPage, isLoading }: any) => {
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
  }, [page, totalPages]);

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
};

const SkeletonRows = ({ pageSize }: { pageSize: number }) => {
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
};

export default function Course() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [mounted, setMounted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const { mutateAsync: deleteCourse } = useDeleteCourse();

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

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
    }
  };

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
          className="w-[180px]"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <SkeletonRows pageSize={pageSize} />
          ) : data?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-destructive">
                No courses available.
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((course: any) => (
              <TableRow key={course.course_id}>
                <TableCell>{course.courseName}</TableCell>
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
        <div>
          {isLoading ? (
            <Skeleton className="h-4 w-64" />
          ) : (
            `Showing ${(page - 1) * pageSize + 1} to ${Math.min(
              page * pageSize,
              data?.meta.total
            )} of ${data?.meta.total} entries`
          )}
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          isLoading={isLoading}
        />
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
