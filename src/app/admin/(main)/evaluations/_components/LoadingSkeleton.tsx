import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, Trash2 } from 'lucide-react';
import React from 'react'

export default function LoadingSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Skeleton className="h-5 w-[250px]" />
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-1">
                                <Skeleton className="h-8 w-8 rounded" />
                                <Skeleton className="h-8 w-8 rounded" />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export function LoadingQuestionDetail() {
    return (<Card>
        <CardHeader>
            <CardTitle>
                <Skeleton className="h-4 w-40" />
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <div>
                        <Skeleton className="h-3 w-32 mb-2" />
                        <Skeleton className="h-4 w-48 mb-2" />
                        <Skeleton className="h-3 w-full" />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" disabled>
                            <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" disabled>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <TableHead key={i} className="text-center">
                                    <Skeleton className="h-3 w-10" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <TableCell key={i} className="text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <Skeleton className="h-4 w-4" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
                <div>
                    <Skeleton className="h-3 w-32 mb-2" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </div>
        </CardContent>
    </Card>);
}