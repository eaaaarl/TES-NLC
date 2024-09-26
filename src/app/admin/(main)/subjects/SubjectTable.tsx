/* eslint-disable prefer-const, @typescript-eslint/no-explicit-any */

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchSubject } from "./action";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Pagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useDeleteSubject } from "./mutation";
import { EditSubjectModalForm } from "./EditSubjectModalForm";

interface Subject {
  subject_id: string;
  subjectName: string;
}

interface Meta {
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}
export default function SubjectTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubject, setSelectedSubejct] = useState<Subject | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useQuery<{ data: Subject[]; meta: Meta }>({
    queryKey: ["subjects", page, pageSize, debouncedSearch],
    queryFn: () => fetchSubject(page, pageSize, debouncedSearch),
  });
  const totalPages = data?.meta.pageCount ?? 1;
  const totalEntries = data?.meta.total ?? 0;

  const { mutateAsync } = useDeleteSubject();

  const handleDeleteSubject = async (subject_id: string) => {
    if (confirm("Are you sure you want to delete this subject.")) {
      await mutateAsync(subject_id);
    }
  };

  const handleEditSubject = async (subject: Subject) => {
    setOpenModal(true);
    setSelectedSubejct(subject);
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
          placeholder="Search subjects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[180px]"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <LoadingSkeleton pageSize={pageSize} />
          ) : data?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-destructive">
                No subject available.
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((subject: Subject) => (
              <TableRow key={subject.subject_id}>
                <TableCell>{subject.subjectName}</TableCell>
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
                      <DropdownMenuItem
                        onClick={() => handleEditSubject(subject)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteSubject(subject.subject_id)}
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
      <div className="mt-4 justify-between flex">
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
      {selectedSubject && (
        <EditSubjectModalForm
          Subject={selectedSubject}
          onOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
