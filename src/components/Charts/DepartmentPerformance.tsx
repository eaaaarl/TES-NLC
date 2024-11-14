// components/Charts/DepartmentPerformance.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const departmentData = [
    {
        department: "CITE",
        performance: 85,
        students: 450,
        facultyCount: 24
    },
    {
        department: "CBM",
        performance: 78,
        students: 320,
        facultyCount: 18
    },
    {
        department: "CFAAS",
        performance: 82,
        students: 380,
        facultyCount: 22
    },
    {
        department: "CTE",
        performance: 75,
        students: 280,
        facultyCount: 16
    }
]

export function DepartmentPerformanceChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Performance metrics by department</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={departmentData}>
                        <XAxis
                            dataKey="department"
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                            tickFormatter={(value) => value.split(' ')[0]}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Department
                                                    </span>
                                                    <span className="font-bold text-muted-foreground">
                                                        {payload[0].payload.department}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Performance
                                                    </span>
                                                    <span className="font-bold">
                                                        {payload[0].value}%
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Students
                                                    </span>
                                                    <span className="font-bold">
                                                        {payload[0].payload.students}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Faculty
                                                    </span>
                                                    <span className="font-bold">
                                                        {payload[0].payload.facultyCount}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Bar
                            dataKey="performance"
                            fill="currentColor"
                            radius={[4, 4, 0, 0]}
                            className="fill-primary"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}