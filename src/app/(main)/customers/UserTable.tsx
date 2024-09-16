"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useDeleteStudent } from "./mutation";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Student {
  id: string;
  studentID: string;
  fullname: string;
  status: string;
}

interface StudentsResponse {
  students: Student[];
  currentPage: number;
  totalPages: number;
}

const fetchStudents = async (
  page: number,
  pageSize: number,
  search: string
): Promise<StudentsResponse> => {
  const response = await fetch(
    `/api/students?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(
      search
    )}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
};

export function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const deleteStudent = useDeleteStudent();
  const router = useRouter();

  const { data, isLoading, isError, error, refetch } = useQuery<
    StudentsResponse,
    Error
  >({
    queryKey: ["students", currentPage, pageSize, search],
    queryFn: () => fetchStudents(currentPage, pageSize, search),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 600); // Debounce delay for search input

    return () => clearTimeout(timer);
  }, [search, refetch]);

  useEffect(() => {
    if (data && data.students.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [data, currentPage]);

  const hasMore = data?.currentPage < data?.totalPages;

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent.mutateAsync(id);
        refetch(); // Refetch data after deletion
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/customers/${id}/edit`);
  };

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <Input
          type="text"
          placeholder="Search by full name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={pageSize.toString()} // Convert number to string for Select value
          onValueChange={(value) => setPageSize(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Page Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4}>Loading...</TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={4}>Error: {error.message}</TableCell>
            </TableRow>
          ) : data.students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>No data available</TableCell>
            </TableRow>
          ) : (
            data.students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.studentID}</TableCell>
                <TableCell>{student.fullname}</TableCell>
                <TableCell>{student.status}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(student.id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(student.id)}>
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
      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {data?.currentPage}</span>
        <Button
          onClick={() => setCurrentPage((prev) => (hasMore ? prev + 1 : prev))}
          disabled={!hasMore}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
