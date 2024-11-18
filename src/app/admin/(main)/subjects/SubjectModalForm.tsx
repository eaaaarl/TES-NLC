"use client"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { subjectSchema, SubjectValues } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect } from 'react'
import { Control, useForm } from "react-hook-form"
import { useCreateSubject, useUpdateSubject } from "./mutation"
import { Loader2 } from "lucide-react"
import { Department, Subject, YearLevel } from "@/lib/types"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"

interface SubjectModalFormProps {
    subject?: Subject | null
    open: boolean;
    onClose: () => void;
}

export default function SubjectModalForm({ subject, open, onClose }: SubjectModalFormProps) {
    const form = useForm<SubjectValues>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
            subject_code: "",
            subjectName: "",
            yearLevelId: "",
            departmentId: ""
        }
    })

    const isUpdating = !!subject;

    const { mutate: createSubject, status: statusCreateSubject } = useCreateSubject();
    const { mutate: updateSubject, status: statusUpdateSubject } = useUpdateSubject();

    const subject_id = subject?.id;
    const submitSubject = (payload: SubjectValues) => {
        if (isUpdating && subject.id) {
            updateSubject({ subject_id: subject_id as string, payload })
        } else {
            createSubject(payload, {
                onSuccess: () => {
                    form.reset();
                }
            })
        }

    }

    useEffect(() => {
        if (subject) {
            form.reset({
                subject_code: subject?.subject_code ?? "",
                subjectName: subject?.subjectName ?? "",
                yearLevelId: subject.yearLevelId,
                departmentId: subject.departmentId
            })
        }
    }, [form, subject])

    const handleClose = () => {
        onClose();
        form.reset()
    }

    const { data: yearLevel, isLoading: yearLevelLoading } = useQuery({
        queryKey: ['subjects', 'yearlevel'],
        queryFn: async (): Promise<YearLevel[]> => {
            const response = await fetch(`/api/admin/yearlevel`)
            if (!response.ok) throw new Error('Failed to fetch year level')
            const data = await response.json();
            return data;
        }
    })

    const { data: department, isLoading: departmentLoading } = useQuery({
        queryKey: ['subjects', 'department'],
        queryFn: async (): Promise<Department[]> => {
            const response = await fetch(`/api/admin/department`)
            if (!response.ok) throw new Error('Failed to fetch department')
            const data = await response.json();
            return data;
        }
    })
    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{isUpdating ? ('Update Subject') : ('Create a new Subject')}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please enter the Subject details below.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitSubject)}>

                        <InputField
                            control={form.control}
                            nameField="subject_code"
                            label="Subject Code"
                        />

                        <InputField
                            control={form.control}
                            nameField="subjectName"
                            label="Subject Name"
                        />

                        {
                            yearLevel && (
                                <SelectYearField
                                    control={form.control}
                                    nameField="yearLevelId"
                                    label="Year Level"
                                    data={yearLevel}
                                    isLoading={yearLevelLoading}
                                />
                            )
                        }

                        {
                            department && (
                                <SelectDepartmentField
                                    control={form.control}
                                    nameField="departmentId"
                                    label="Department"
                                    data={department}
                                    isLoading={departmentLoading}
                                />
                            )
                        }
                        <AlertDialogFooter className="mt-3">
                            <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
                            <Button type="submit" disabled={statusCreateSubject === 'pending' || statusUpdateSubject === 'pending'}>
                                {statusCreateSubject === 'pending' || statusUpdateSubject === 'pending' ? (<Loader2 className="h-4 w-4 animate-spin" />) : isUpdating ? ('Update') : ('Submit')}
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function InputField({ control, nameField, label, placeholder }: { control: Control<SubjectValues>, nameField: keyof SubjectValues, label: string, placeholder?: string }) {
    return <FormField control={control} name={nameField} render={({ field }) => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Input {...field} placeholder={placeholder} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )} />
}

function SelectYearField({
    control,
    nameField,
    label,
    data,
    isLoading
}:
    {
        control: Control<SubjectValues>,
        nameField: keyof SubjectValues,
        label: string,
        data: YearLevel[],
        isLoading: boolean
    }) {
    return <FormField
        control={control}
        name={nameField}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={`Select ${label}`} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {isLoading ?
                                    (
                                        <>
                                            <div className="p-2">
                                                <Skeleton className="h-5 w-full" />
                                            </div>
                                            <div className="p-2">
                                                <Skeleton className="h-5 w-full" />
                                            </div>
                                        </>
                                    ) :
                                    (data?.map((y) => (
                                        <SelectItem key={y.id} value={y.id}>
                                            {y.yearName}
                                        </SelectItem>
                                    )))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
}

function SelectDepartmentField({
    control,
    nameField,
    label,
    data,
    isLoading
}:
    {
        control: Control<SubjectValues>,
        nameField: keyof SubjectValues,
        label: string,
        data: Department[],
        isLoading: boolean
    }) {
    return <FormField
        control={control}
        name={nameField}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={`Select ${label}`} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {isLoading ?
                                    (
                                        <>
                                            <div className="p-2">
                                                <Skeleton className="h-5 w-full" />
                                            </div>
                                            <div className="p-2">
                                                <Skeleton className="h-5 w-full" />
                                            </div>
                                        </>
                                    ) :
                                    (data?.map((d) => (
                                        <SelectItem key={d.id} value={d.id}>
                                            {d.departmentName}
                                        </SelectItem>
                                    )))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
}