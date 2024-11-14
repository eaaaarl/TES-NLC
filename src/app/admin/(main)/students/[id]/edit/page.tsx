
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import React from 'react'
import EditStudentForm from './EditStudentForm'

export default function EditStudentPage() {

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">
                    Edit Student
                </h1>
            </div>
            <Card>
                <CardHeader className=' mx-10'>
                    <CardDescription>{"Manage student's"}</CardDescription>
                </CardHeader>
                <CardContent>
                    <EditStudentForm />
                </CardContent>
            </Card>
        </main>
    )
}
