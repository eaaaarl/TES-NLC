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
import { Subject } from "@/lib/types"

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
            subjectName: ""
        }
    })

    const isUpdating = !!subject;

    const { mutate: createSubject, status: statusCreateSubject } = useCreateSubject();
    const { mutate: updateSubject, status: statusUpdateSubject } = useUpdateSubject();
    const subject_id = subject?.id;
    const submitSubject = (payload: SubjectValues) => {
        if (isUpdating) {
            updateSubject({ subject_id: subject_id as string, values: payload })
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
                subjectName: subject?.subjectName
            })
        }
    }, [form, subject])

    const handleClose = () => {
        onClose();
        form.reset()
    }

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
