"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from './_components/CategoryForm';
import CategoryTable from './_components/CategoryTable';
import { Category, Question } from '@/lib/types';
import QuestionForm from './_components/QuestionForm';
import QuestionTable from './_components/QuestionTable';
import TableViewQuestion from './_components/TableViewQuestion';

export default function EvaluationQuestionForm() {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [showPreviewDialog, setShowPreviewDialog] = useState(false);

    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category);
    };

    const handleCloseEdit = () => {
        setSelectedCategory(null);
    };

    const handleEditQuestion = (question: Question) => {
        setSelectedQuestion(question);
    };

    const handleCloseEditQuestion = () => {
        setSelectedQuestion(null);
    };

    return (
        <div className="flex flex-1 flex-col p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-lg font-semibold md:text-2xl">
                        Evaluation Questions
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage categories and evaluation questions
                    </p>
                </div>
            </div>

            <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className='text-lg mb-3'>Question Preview</DialogTitle>
                    </DialogHeader>
                    <TableViewQuestion />
                </DialogContent>
            </Dialog>

            <Tabs defaultValue="categories" className="w-full">
                <TabsList className="w-auto mb-4">
                    <TabsTrigger value="categories" className="px-8">Categories</TabsTrigger>
                    <TabsTrigger value="questions" className="px-8">Questions</TabsTrigger>
                </TabsList>

                <TabsContent value="categories">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <CategoryForm
                            category={selectedCategory}
                            onClose={handleCloseEdit}
                        />
                        <Card className='col-span-2'>
                            <CardHeader>
                                <CardTitle>Category Management</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <CategoryTable onEdit={handleEditCategory} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="questions">
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                        <QuestionForm
                            question={selectedQuestion}
                            onClose={handleCloseEditQuestion}
                        />
                        <Card className='col-span-2'>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Question Preview</CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowPreviewDialog(true)}
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview All
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="detailed" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="detailed">Detailed View</TabsTrigger>
                                        <TabsTrigger value="table">Table View</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="detailed">
                                        <QuestionTable onEdit={handleEditQuestion} />
                                    </TabsContent>
                                    <TabsContent value="table">
                                        <TableViewQuestion />
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}