import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/hooks/use-toast";
import { useDeleteSection } from "./mutation";
import { fetchSection } from "./action";
import { Sections } from "@/lib/types";

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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";

import Pagination from "@/components/Pagination";
import SectionModalForm from "./SectionModalForm";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import SectionTableLoadingSkeleton from "./SectionTableLoadingSkeleton";

export default function SectionTable() {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [onOpen, setOnOpen] = useState(false);
  const [onOpenConfirmDialog, setOnOpenConfirmDialog] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<Sections | null>(null);
  const [selectedSection, setSelectedSection] = useState<Sections | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["sections", page, pageSize, debouncedSearch],
    queryFn: () => fetchSection(page, pageSize, debouncedSearch),
  });

  const { mutate: deleteSection } = useDeleteSection();

  const handleEdit = (section: Sections) => {
    setOnOpen(true);
    setSelectedSection(section);
  };

  const openDeleteDialog = (section: Sections) => {
    setOnOpenConfirmDialog(true);
    setSectionToDelete(section);
  };

  const handleDelete = () => {
    if (sectionToDelete) {
      deleteSection(sectionToDelete.id, {
        onSuccess: () => {
          toast({
            description: "Deleted Section.",
          });
          setOnOpenConfirmDialog(false);
          setSectionToDelete(null);
        },
      });
    }
  };

  if (isLoading) {
    return <SectionTableLoadingSkeleton rowCount={pageSize} />;
  }

  return (
    <>
      <div className="mb-4 flex justify-between items-center space-x-4">
        <Select
          value={String(pageSize)}
          onValueChange={(value) => setPageSize(Number(value))}
        >
          <SelectTrigger className="w-18">
            <SelectValue placeholder="Page Size" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Search sections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[180px] text-base"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Section Name</TableHead>
            <TableHead>Year Level</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-destructive">
                No Section available.
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((section) => (
              <TableRow key={section.id}>
                <TableCell>{section.sectionName}</TableCell>
                <TableCell>{section.yearLevel.yearName.toUpperCase()}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(section)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => openDeleteDialog(section)}>
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

      <div className="mt-4 flex justify-between items-center">
        <div className="hidden md:block w-full">
          Showing {(page - 1) * pageSize + 1} to{" "}
          {Math.min(page * pageSize, data?.meta.total ?? 0)} of{" "}
          {data?.meta.total} entries
        </div>
        <div className="flex md:justify-end justify-center w-full">
          <Pagination
            page={page}
            totalPages={data?.meta.pageCount || 0}
            setPage={setPage}
          />
        </div>
      </div>

      <SectionModalForm
        onOpen={onOpen}
        onClose={() => setOnOpen(false)}
        section={selectedSection}
      />

      <ConfirmDeleteDialog
        isOpen={onOpenConfirmDialog}
        onCancel={() => setOnOpenConfirmDialog(false)}
        onConfirm={handleDelete}
        itemName={sectionToDelete?.sectionName}
      />
    </>
  );
}