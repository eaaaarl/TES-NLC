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
import { Students } from "@/lib/types";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import { useRouter } from "next/navigation";
import StudentTableLoadingSkeleton from "./StudentTableLoadingSkeleton";
import EmptyState from "@/components/EmptyState";

export default function StudentTable() {
  const router = useRouter();
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [mounted, setMounted] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Students | null>(null);
  const [onOpenDelete, setOnOpenDelete] = useState<boolean>(false);

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

  const handleOpenDeleteDialog = (student: Students) => {
    setOnOpenDelete(true);
    setStudentToDelete(student);
  }

  const handleDelete = () => {
    if (studentToDelete) {
      mutate(studentToDelete?.id, {
        onSuccess: () => {
          toast({
            description: "Student Deleted.",
          });
        },
      });

      setOnOpenDelete(false);
      setStudentToDelete(null);
    }
  };


  const handleEdit = (id: string) => {
    router.push(`/admin/students/${id}/edit`)
  }

  if (!mounted) return null;
  const totalEntries = data?.meta.total || 0;
  const totalPages = data?.meta.pageCount || 0;

  if (isLoading) {
    return <StudentTableLoadingSkeleton rowCount={pageSize} />
  }
  return (
    <>
      <div className="mb-4 flex justify-between items-center space-x-4">
        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            setPageSize(parseInt(value));
            setPage(1);
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
          className="w-[200px] text-base"
        />
      </div>

      <Table className="hidden lg:table">
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead className="hidden lg:table-cell">Full Name</TableHead>
            <TableHead className="hidden lg:table-cell">Year Level</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Sections</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <EmptyState
                  iconClassName="w-8 h-8 text-gray-400 dark:text-blue-400"
                  title="No students found"
                  message="There are no students registered yet. Students added will appear here."
                />
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((student) => (
              <TableRow key={student.studentID}>
                <TableCell>{student.studentID}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center ">
                    <div className="mr-3 border shadow-lg rounded-full overflow-hidden">
                      {/* {student.avatarUrl ? (
                        <Image
                          alt={`Avatar_${student.id}`}
                          src={student.avatarUrl}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                      ) : (
                        <Image
                          alt={`avatar`}
                          src="/default-user.png"
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                      )} */}
                    </div>
                    <div>
                    </div>
                  </div>
                  {student.firstname} {student.middlename} {student.lastname}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {student.section.yearLevel.yearName.toUpperCase()}
                </TableCell>
                <TableCell>
                  {student.course.department.departmentName}
                </TableCell>
                <TableCell>{student.section.sectionName}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(student.id)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleOpenDeleteDialog(student)}
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
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-4 mb-2" />
                <Skeleton className="h-4 mb-2" />
                <Skeleton className="h-4 mb-2" />
              </div>
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
                  <h3 className="text-lg font-semibold">{student.studentID}</h3>
                  <div>
                    <Badge variant={"destructive"}>{student.status}</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {student.firstname.toUpperCase()}{" "}
                    {student.middlename.toUpperCase()}{" "}
                    {student.lastname.toUpperCase()}
                  </h3>
                  <div className="font-semibold">BSCS-3A</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="mb-2 flex-row">
                    <div className="text-sm">Year Level</div>
                    <div>{student.yearLevelId.toUpperCase()}</div>
                  </div>
                  <div className="mb-2 flex-row">
                    <div className="text-sm ">Department</div>
                    <div>
                      {student.course.department.departmentName.toUpperCase()}
                    </div>
                  </div>
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

      <div className="mt-4 flex justify-between items-center">
        <div className="hidden md:block w-full">
          {isLoading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            `Showing ${(page - 1) * pageSize + 1} to ${Math.min(
              page * pageSize,
              totalEntries
            )} of ${totalEntries} entries`
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

      <ConfirmDeleteDialog itemName={studentToDelete?.studentID} onConfirm={handleDelete} onCancel={() => setOnOpenDelete(false)} isOpen={onOpenDelete} />
    </>
  );
}
