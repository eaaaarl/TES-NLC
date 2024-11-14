import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Question } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { Edit2, Trash2 } from 'lucide-react'
import React from 'react'
import { LoadingQuestionDetail } from './LoadingSkeleton'

interface QuestionTableProps {
    onEdit: (Question: Question) => void | null
}

export default function QuestionTable({ onEdit }: QuestionTableProps) {

    const { data, isLoading } = useQuery({
        queryKey: ['question'],
        queryFn: async (): Promise<{ data: Question[] }> => {
            const response = await fetch(`/api/admin/question`);
            if (!response.ok) {
                throw new Error('Failed to fetch the question')
            }
            return response.json()
        }
    })



    return (
        <div className="space-y-8">
            {isLoading ?
                (<LoadingQuestionDetail />)
                : data?.data.map((q: Question) => (
                    <div key={q.id} className="space-y-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-medium text-sm text-muted-foreground">
                                    {q.category.name} {q.required && <span className="text-red-500">*</span>}
                                </h3>
                                <p className="font-medium">{q.question}</p>
                                {q.description && (
                                    <p className="text-sm text-muted-foreground mt-1">{q.description}</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onEdit(q)}
                                >
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {q.ratingScale.map((scale) => (
                                        <TableHead key={scale.id} className="text-center">
                                            {scale.rating}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    {q.ratingScale.map((scale) => (
                                        <TableCell key={scale.id} className="text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <span>○</span>
                                                <span className="text-xs text-muted-foreground">{scale.description}</span>
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>

                        {q.allowComments && (
                            <div>
                                <label className="text-sm font-medium mb-2 block">Additional Comments</label>
                                <Textarea
                                    placeholder="Enter your comments here (optional)"
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                        )}
                    </div>
                ))}
        </div>
    )
}
