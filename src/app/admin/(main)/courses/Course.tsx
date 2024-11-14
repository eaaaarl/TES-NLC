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
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { fetchCourses } from "./action";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteCourse } from "./mutation";
import { EditModalForm } from "./EditModalForm";
import Pagination from "@/components/Pagination";
import { useToast } from "@/hooks/use-toast";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import { Course } from "@/lib/types";
import CourseTableLoadingSkeleton from "./CourseTableLoadingSkeleton";

export default function CourseTable() {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [mounted, setMounted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [openOnconfirmDeleteDialog, setOpenConfirmDeleteDialog] =
    useState<boolean>(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

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

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setOpenModal(true);
  };

  const openDeleteDialog = (course: Course) => {
    setOpenConfirmDeleteDialog(true);
    setCourseToDelete(course);
  };

  const handleDelete = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete.id, {
        onSuccess: () => {
          toast({
            description: "Deleted Course.",
          });
        },
      });
    }
    setOpenConfirmDeleteDialog(false);
    setCourseToDelete(null);
  };

  if (!mounted) return null;

  if (isLoading) {
    return <CourseTableLoadingSkeleton rowCount={pageSize} />
  }

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
          {data?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-destructive">
                No courses available.
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.department.departmentName}</TableCell>
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
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => openDeleteDialog(course)}
                      >
                        <Trash className="mr-2 h-4 w-4 text-red-600" />
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
        <div className="hidden md:block w-full">
          Showing {(page - 1) * pageSize + 1} to{" "}
          {Math.min(page * pageSize, data?.meta.total ?? 0)} of{" "}
          {data?.meta.total} entries
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

      <ConfirmDeleteDialog
        isOpen={openOnconfirmDeleteDialog}
        onCancel={() => setOpenConfirmDeleteDialog(false)}
        itemName={courseToDelete?.courseName}
        onConfirm={handleDelete}
      />
    </>
  );
}
