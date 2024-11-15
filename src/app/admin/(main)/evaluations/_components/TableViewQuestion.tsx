import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Question } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function TableViewQuestion() {
    const { data, isLoading } = useQuery({
        queryKey: ['question'],
        queryFn: async (): Promise<{ data: Question[] }> => {
            const response = await fetch(`/api/admin/question`);
            if (!response.ok) {
                throw new Error('Failed to fetch question')
            }

            return response.json();
        }
    })

    const categories = React.useMemo(() => {
        if (!data?.data) return {};

        return data.data.reduce((acc, question) => {
            if (!acc[question.category.name]) {
                acc[question.category.name] = []
            }
            acc[question.category.name].push(question);
            return acc;
        }, {} as Record<string, Question[]>)
    }, [data?.data])

    if (isLoading) {
        return (
            <div className='space-y-6'>
                <div className="flex justify-between text-sm text-gray-500 px-4">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-4 w-32" />
                    ))}
                </div>
                {[...Array(3)].map((_, categoryIndex) => (
                    <Card key={categoryIndex} className='shadow-sm'>
                        <CardHeader className='pb-2'>
                            <CardTitle className='text-lg gap-2 flex'>
                                <Skeleton className="h-6 w-6" />
                                <Skeleton className="h-6 w-48" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                            {[...Array(3)].map((_, questionIndex) => (
                                <div key={questionIndex} className="space-y-4">
                                    <div className='flex gap-2'>
                                        <Skeleton className="h-4 w-4" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-3 w-3/4" />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-5 gap-4'>
                                        {[...Array(5)].map((_, scaleIndex) => (
                                            <div key={scaleIndex} className="flex items-center justify-center gap-2">
                                                <div className="flex items-center space-x-2">
                                                    <Skeleton className="h-4 w-4 rounded-full" />
                                                    <Skeleton className="h-4 w-4" />
                                                </div>
                                                <div className="hidden sm:block">
                                                    <Skeleton className="h-3 w-16" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-2">
                                        <Skeleton className="h-4 w-20 mb-2" />
                                        <Skeleton className="h-24 w-full" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className='space-y-6'>
            <div className="flex justify-between text-sm text-gray-500 px-4">
                <div>5 - Outstanding</div>
                <div>4 - Very Satisfactory</div>
                <div>3 - Satisfactory</div>
                <div>2 - Fair</div>
                <div>1 - Poor</div>
            </div>
            {Object.entries(categories).map(([categoryName, question], categoryIndex) => (
                <Card key={categoryIndex} className='shadow-sm'>
                    <CardHeader className='pb-2'>
                        <CardTitle className='text-lg gap-2 flex'>
                            <span className='font-medium'>
                                {String.fromCharCode(65 + categoryIndex)}.
                            </span>
                            {categoryName}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        {question.map((question, index) => (
                            <div key={question.id}>
                                <div className='flex gap-2'>
                                    <span>{index + 1}.</span>
                                    <div>
                                        <p>{question.question}</p>
                                        {question.description && (
                                            <p className="text-sm text-gray-500 mt-1">{question.description}</p>
                                        )}
                                    </div>
                                </div>
                                <div className='grid grid-cols-5 gap-4'>
                                    {question.ratingScale.sort((a, b) => b.rating - a.rating).map((scale) => (
                                        <div key={scale.id} className="flex items-center justify-center gap-2">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    disabled
                                                />
                                                <Label
                                                    htmlFor={`question-${question.id}-rating-${scale.rating}`}
                                                    className="text-sm cursor-pointer"
                                                >
                                                    {scale.rating}
                                                </Label>
                                            </div>
                                            <div className="text-xs text-gray-500 hidden sm:block">
                                                {scale.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {question.allowComments && (
                                    <div className="mt-2">
                                        <Label htmlFor={`comment-${question.id}`} className="text-sm">
                                            Comments
                                        </Label>
                                        <Textarea
                                            disabled
                                            className="mt-1"
                                            placeholder="Enter your comments here..."
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
