import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { Edit2, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import LoadingSkeleton from './LoadingSkeleton'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import { useDeleteCategory } from '../mutation'
import { useToast } from '@/hooks/use-toast'

interface Category {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

interface CategoryTableProps {
    onEdit: (category: Category) => void;
}

export default function CategoryTable({ onEdit }: CategoryTableProps) {
    const { toast } = useToast()
    const [onConfirmDeleteDialog, setOnConfirmDeleteDialog] = useState<boolean>(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async (): Promise<{ data: Category[] }> => {
            const response = await fetch(`/api/admin/category`)
            if (!response.ok) {
                throw new Error('Failed to fetch the category')
            }
            return response.json()
        }
    })

    const openDeleteDilaog = (category: Category) => {
        setOnConfirmDeleteDialog(true);
        setCategoryToDelete(category)
    }

    const { mutate, status } = useDeleteCategory()
    const handleDelete = () => {
        if (categoryToDelete) {
            mutate(categoryToDelete?.id, {
                onSuccess: () => {
                    toast({
                        description: 'Category deleted.'
                    })
                    setCategoryToDelete(null)
                    setOnConfirmDeleteDialog(false)
                }
            })
        }

    }

    if (isLoading) {
        return <LoadingSkeleton />
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead className="w-20">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((category: Category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.name.toUpperCase()}</TableCell>
                            <TableCell>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(category)}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openDeleteDilaog(category)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ConfirmDeleteDialog
                isOpen={onConfirmDeleteDialog}
                onCancel={() => setOnConfirmDeleteDialog(false)}
                onConfirm={handleDelete}
                itemName={categoryToDelete?.name}
                isLoading={status === 'pending'}
            />
        </>
    )
}
