"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { fetchAcademicYear } from './action'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import { AcademicYear } from '@/lib/types'
import { useDeleteAcademicYear } from './mutatation'
import LoadingTableSkeleton from '@/components/LoadingTableSkeleton'
import AcademicYearModalForm from './AcademicYearModalForm'
import EmptyState from '@/components/EmptyState'

export default function AcademicYearTable() {
    const { toast } = useToast();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [onOpenOnConfirmDeleteDialog, setOnOpenDeleteDialog] = useState<boolean>(false);
    const [academicYearToDelete, setAcademicYearToDelete] = useState<AcademicYear | null>(null);
    const [onOpen, setOnOpen] = useState<boolean>(false);
    const [selectedAcademicYear, setSelectedAcademicYear] = useState<AcademicYear | null>(null);
    const { data, isLoading } = useQuery({
        queryKey: ['academic-year', page, pageSize, debouncedSearch],
        queryFn: () => fetchAcademicYear(page, pageSize, debouncedSearch)
    })

    const handleEditModal = (academicYear: AcademicYear) => {
        setSelectedAcademicYear(academicYear);
        setOnOpen(true);
    }

    const openConfirmDeleteDialog = (academicYear: AcademicYear) => {
        setOnOpenDeleteDialog(true);
        setAcademicYearToDelete(academicYear);
    }

    const { mutate: deleteAcademicYear } = useDeleteAcademicYear();

    const handleDelete = () => {
        if (academicYearToDelete) {
            deleteAcademicYear(academicYearToDelete.id, {
                onSuccess: () => {
                    toast({
                        description: "Deleted Academic Year.",
                    });
                    setAcademicYearToDelete(null);
                    setOnOpenDeleteDialog(false);
                }
            })
        }

    }

    if (isLoading) {
        return <LoadingTableSkeleton rowCount={pageSize} />
    }
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Academic Year</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <EmptyState />
                            </TableCell>
                        </TableRow>
                    ) : (
                        data?.data.map((academicyear) => (
                            <TableRow key={academicyear.id}>
                                <TableCell>{academicyear.year}</TableCell>
                                <TableCell>{academicyear.semester}</TableCell>
                                <TableCell>{academicyear.isActive === true ? (<Badge className='bg-green-500'>Active</Badge>) : (<Badge variant={'destructive'}>Inactive</Badge>)}</TableCell>
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
                                            <DropdownMenuItem onClick={() => handleEditModal(academicyear)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => openConfirmDeleteDialog(academicyear)}
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
            </Table >

            <AcademicYearModalForm
                transform='edit'
                onOpen={onOpen}
                onClose={() => setOnOpen(false)}
                academicYear={selectedAcademicYear}
            />

            <ConfirmDeleteDialog
                onConfirm={handleDelete}
                itemName={academicYearToDelete?.year + ' ' + academicYearToDelete?.semester.toUpperCase()}
                isOpen={onOpenOnConfirmDeleteDialog}
                onCancel={() => setOnOpenDeleteDialog(false)}
            />
        </>
    )
}
