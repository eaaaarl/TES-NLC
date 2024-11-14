"use client";

import { getDepartmentByCourse } from '@/app/(auth)/signup/action';
import SelectCourse from '@/components/course/SelectCourse';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Department } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getStudentById } from './action';
import { useParams, useRouter } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useUpdateStudent } from './mutation';
import { Loader2 } from 'lucide-react';
import { StudentEditSchema, StudentEditValues } from '@/lib/validation';



export default function EditStudentForm() {
    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [department, setDepartment] = useState<Department | null>(null);
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');
    const { id } = useParams();
    const studentId = Array.isArray(id) ? id[0] : id;

    const form = useForm<StudentEditValues>({
        resolver: zodResolver(StudentEditSchema),
        defaultValues: {
            studentID: "",
            firstname: "",
            middlename: "",
            lastname: "",
            courseId: "",
            departmentId: "",
            gender: ""
        }
    });

    const { data: student, isLoading } = useQuery({
        queryKey: ['students', studentId],
        queryFn: () => getStudentById(studentId),
        enabled: !!studentId,
        staleTime: 0,
    });

    // Reset form when student data is loaded
    useEffect(() => {
        if (student) {
            const courseId = student.courseID ?? '';
            const gender = student.gender ?? '';
            form.reset({
                studentID: student.studentID,
                firstname: student.firstname,
                middlename: student.middlename,
                lastname: student.lastname,
                courseId: courseId,
                departmentId: student.departmentId ?? "",
                gender: gender,
            });
            setSelectedCourseId(courseId);

        }
    }, [student, form]);

    // Handle department fetching
    useEffect(() => {
        const getDepartment = async () => {
            if (selectedCourseId) {
                const result = await getDepartmentByCourse(selectedCourseId);
                setDepartment(result);
                if (result && result.id) {
                    form.setValue('departmentId', result.id);
                }
            }
        };
        getDepartment();
    }, [selectedCourseId, form]);

    // Prefetch courses data
    useEffect(() => {
        queryClient.prefetchQuery({
            queryKey: ['courses'],
            queryFn: () => fetch('/api/admin/courses/all-course').then(res => res.json()),
            staleTime: 10000,
        });
    }, [queryClient]);

    const { mutate, status } = useUpdateStudent();

    const onSubmit = (payload: StudentEditValues) => {
        mutate({ id: studentId, values: payload }, {
            onSuccess: () => {
                toast({
                    description: 'Updated Student.'
                })
                router.back()
                form.reset()
            }
        })
    };

    const LoadingSkeleton = () => (
        <div className="space-y-4 mx-10">
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
                {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} className="h-[70px] w-full" />
                ))}
            </div>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
                {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} className="h-[70px] w-full" />
                ))}
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                <Skeleton className="h-[70px] w-full" />
            </div>
            <div className='space-x-3'>
                <Skeleton className="h-10 w-20 inline-block" />
                <Skeleton className="h-10 w-20 inline-block" />
            </div>
        </div>
    );

    if (isLoading) {
        return <LoadingSkeleton />;
    }
    return (
        <Form {...form}>
            <form className="space-y-4 mx-10" onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
                    <FormField
                        name='firstname'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name='middlename'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Middle Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name='lastname'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
                    <FormField
                        name='studentID'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Student ID</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        name='courseId'
                        control={form.control}
                        render={({ field }) => (
                            <SelectCourse
                                key={field.value}
                                field={field}
                                onCourseChange={setSelectedCourseId}
                            />
                        )}
                    />

                    <div>
                        <FormItem>
                            <FormLabel>Department</FormLabel>
                            <Input value={department?.departmentName ?? ""} readOnly />
                        </FormItem>
                        <FormField
                            control={form.control}
                            name="departmentId"
                            render={({ field }) => (

                                <Input
                                    {...field}
                                    value={department?.id ?? ""}
                                    type="hidden"
                                />
                            )}
                        />

                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    <FormField name='gender' control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <Select key={field.value} value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select Gender' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value='male'>Male</SelectItem>
                                            <SelectItem value='female'>Female</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <div className='space-x-3'>
                    <Button type='submit' disabled={status === 'pending'}>{status === 'pending' ? (<Loader2 className='h-4 w-4 animate-spin' />) : 'Save'}</Button>
                    <Button variant='outline' type="button" onClick={() => router.back()}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
}