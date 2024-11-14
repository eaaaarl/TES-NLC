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
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
import { Subject } from "@/lib/types";
import SubjectModalForm from "./SubjectModalForm";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import LoadingTableSkeleton from "@/components/LoadingTableSkeleton";

export interface Meta {
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
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedSubject, setSelectedSubejct] = useState<Subject | null>(null);
  const [mounted, setMounted] = useState(false);
  const [subjecToDelete, setSubjectToDelete] = useState<Subject | null>(null);

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


  const handleOpenDelete = async (subject: Subject) => {
    setSubjectToDelete(subject);
    setOpenModal(true);
  };

  const handleOpenEditModal = async (subject: Subject) => {
    setSelectedSubejct(subject);
    setOpenEditDialog(true);
  }

  const { mutate, status } = useDeleteSubject();
  const handleDelete = () => {
    if (subjecToDelete) {
      mutate(subjecToDelete.id, {
        onSuccess: () => {
          setOpenModal(false);
        }
      });
    }
  }

  if (isLoading) {
    return <LoadingTableSkeleton />
  }

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
          className="w-[180px] text-base"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject Code</TableHead>
            <TableHead>Subject Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-destructive">
                No subject available.
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((subject: Subject) => (
              <TableRow key={subject.id}>
                <TableCell>{subject.subject_code}</TableCell>
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
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenEditModal(subject)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleOpenDelete(subject)}>
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

      <SubjectModalForm
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        subject={selectedSubject}
      />

      <ConfirmDeleteDialog
        itemName={subjecToDelete?.subject_code ?? ""}
        onConfirm={handleDelete}
        isOpen={openModal}
        onCancel={() => setOpenModal(false)}
      />
    </>
  );
}
