import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import React from 'react'
import AcademicYearModalForm from './AcademicYearModalForm'
import AcademicYearTable from './AcademicYearTable'

export default function AcademicYearPages() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">
                    {"List of Academic Year's"}
                </h1>
                <AcademicYearModalForm />
            </div>
            <Card>
                <CardHeader>
                    <CardDescription>{"Manage Academic Year's"}</CardDescription>
                </CardHeader>
                <CardContent>
                    <AcademicYearTable />
                </CardContent>
            </Card>
        </main>
    )
}
