"use client"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AcademicYearSchema, academicYearValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useCreateAcademicYear, useUpdateAcademicYear } from './mutatation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { AcademicYear } from '@/lib/types';

interface AcademicYearModalFormProps {
    onOpen?: boolean;
    onClose?: () => void;
    transform?: 'create' | 'edit';
    academicYear?: AcademicYear | null;
}

export default function AcademicYearModalForm({ onOpen, onClose, transform, academicYear }: AcademicYearModalFormProps) {
    const { toast } = useToast()
    const form = useForm({
        resolver: zodResolver(AcademicYearSchema),
        defaultValues: {
            year: '',
            semester: '',
            isActive: true
        }
    })
    const isUpdating = !!academicYear;
    const { mutate: createAcademicYear, status: statusAcademicYear } = useCreateAcademicYear();
    const { mutate: updateAcademicYear, status: statusUpdateAcademicYear } = useUpdateAcademicYear();

    const SubmitAcademicYear = (values: academicYearValues) => {
        if (isUpdating) {
            updateAcademicYear({ payload: values, id: academicYear.id }, {
                onSuccess: (updatedAcademicYear: AcademicYear) => {
                    toast({
                        description: 'Academic Year Updated.'
                    });
                    form.reset({
                        year: updatedAcademicYear.year,
                        semester: updatedAcademicYear.semester,
                        isActive: updatedAcademicYear.isActive
                    });
                    if (onClose) {
                        onClose();
                    }
                }
            })
        } else {
            createAcademicYear(values, {
                onSuccess: () => {
                    toast({
                        description: 'Academic Year Created.'
                    });
                    form.reset();
                }
            })
        }

    }

    useEffect(() => {
        if (academicYear) {
            form.reset({
                year: academicYear.year,
                semester: academicYear.semester,
                isActive: academicYear.isActive
            })
        }
    }, [academicYear, form])

    const handleReset = () => {
        form.reset()
    }
    console.log(academicYear?.id);
    return (
        <AlertDialog
            open={onOpen}
            onOpenChange={(open) => {
                if (!open && onClose) {
                    onClose();
                }
            }}>
            {transform === 'edit' ? null : (<AlertDialogTrigger asChild>
                <Button>Create Academic Year</Button>
            </AlertDialogTrigger>)}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{isUpdating ? ('Update Academic Year') : ('Create new Academic Year')}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please enter the academic year details below.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(SubmitAcademicYear)}>
                        <FormField control={form.control} name='year' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Year</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='semester' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Semester</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select Semester' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='1ST SEMESTER'>1ST SEMESTER</SelectItem>
                                                <SelectItem value='2ND SEMESTER'>2ND SEMESTER</SelectItem>
                                                <SelectItem value='SUMMBER'>SUMMER</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {transform === 'edit' ?
                            (<FormField control={form.control} name='isActive' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(value === 'true')}
                                            value={String(field.value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select Status' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value='true'>Active</SelectItem>
                                                    <SelectItem value='false'>Inactive</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            ) : null}

                        <AlertDialogFooter className='mt-3'>
                            <AlertDialogCancel onClick={handleReset}>Cancel</AlertDialogCancel>
                            <Button disabled={statusAcademicYear === 'pending' || statusUpdateAcademicYear === 'pending'}>{
                                statusAcademicYear === 'pending' ? (<Loader2 className='h-4 w-4 animate-spin' />) : statusUpdateAcademicYear === 'pending' ? (<Loader2 className='h-4 w-4 animate-spin' />) : isUpdating ? ('Update') : "Submit"
                            }</Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
