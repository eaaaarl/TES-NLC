// components/EvaluationCalendar.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

const upcomingEvaluations = [
    {
        date: "2024-11-15",
        department: "Computer Science",
        type: "Mid-term",
    },
    {
        date: "2024-11-20",
        department: "Engineering",
        type: "Final",
    },
    {
        date: "2024-11-25",
        department: "Mathematics",
        type: "Peer Review",
    }
]

export function EvaluationCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
        <Card>
            <CardHeader>
                <CardTitle>Evaluation Calendar</CardTitle>
                <CardDescription>Schedule and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="w-full rounded-md border"
                        classNames={{
                            months: "w-full",
                            month: "w-full",
                            table: "w-full border-collapse",
                            head_row: "flex w-full",
                            head_cell: "w-full text-muted-foreground rounded-md text-[0.8rem] font-normal",
                            row: "flex w-full mt-2",
                            cell: "w-full text-center text-sm relative p-0 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "w-full h-9 p-0 font-normal aria-selected:opacity-100 hover:bg-muted/50",
                            day_today: "bg-accent text-accent-foreground",
                            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                        }}
                    />
                </div>
                <div className="mt-4 space-y-4">
                    <h4 className="text-sm font-semibold">Upcoming Evaluations</h4>
                    {upcomingEvaluations.map((evaluation, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{evaluation.date}</span>
                            </div>
                            <Badge variant="outline">{evaluation.type}</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}