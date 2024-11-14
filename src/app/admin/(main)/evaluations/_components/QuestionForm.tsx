import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Category, Question } from '@/lib/types';
import { QuestionSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Loader, Plus, Save, Settings2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Control, useController, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateQuestion } from '../mutation';
import { useToast } from '@/hooks/use-toast';

interface QuestionFormProps {
    question?: Question | null;
    onClose?: () => void;
}

export const defaultRatingScale = [
    { id: '1', rating: 1, description: 'POOR' },
    { id: '2', rating: 2, description: 'FAIR' },
    { id: '3', rating: 3, description: 'SATISFACTORY' },
    { id: '4', rating: 4, description: 'VERY SATISFACTORY' },
    { id: '5', rating: 5, description: 'OUTSTANDING' },
];

export default function QuestionForm({ question, onClose }: QuestionFormProps) {
    const { toast } = useToast()

    const { data, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async (): Promise<{ data: Category[] }> => {
            const response = await fetch(`/api/admin/category`)
            if (!response.ok) {
                throw new Error('Failed to fetch the category')
            }
            return response.json()
        }
    })

    const form = useForm<FormValues>({
        resolver: zodResolver(QuestionSchema),
        defaultValues: {
            categoryName: '',
            question: '',
            description: '',
            required: true,
            allowComments: false,
            ratingScale: undefined
        }
    })

    useEffect(() => {
        if (question) {
            form.reset({
                categoryName: question.category.id,
                question: question.question,
                description: question.description,
                required: question.required,
                allowComments: question.allowComments,
                ratingScale: question.ratingScale ?? defaultRatingScale,
            });
        } else {
            form.reset({
                categoryName: '',
                question: '',
                description: '',
                required: true,
                allowComments: false,
                ratingScale: defaultRatingScale
            })
        }
    }, [question, form])

    const { mutate: createQuestion, status: statusCreate } = useCreateQuestion();

    const submitQuestion = (payload: FormValues) => {
        createQuestion(payload, {
            onSuccess: () => {
                toast({
                    description: 'Question created.'
                })
                form.reset();
            }
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{question ? 'Edit Question' : 'Add New Question'}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitQuestion)}>
                        <div className="space-y-4">
                            {/* Category Field */}
                            <FormField
                                control={form.control}
                                name="categoryName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {isLoading ? (
                                                            <div className="p-2">
                                                                <Skeleton className="h-5 w-full" />
                                                            </div>
                                                        ) : data?.data.map((category) => (
                                                            <SelectItem key={category.id} value={category.id}>
                                                                {category.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Question Field */}
                            <FormField
                                control={form.control}
                                name="question"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Question</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Enter your question here" rows={2} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description Field */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description/Help Text</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Add additional context or instructions for this question"
                                                rows={3}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Question Settings Component */}
                            <QuestionSettings control={form.control} />

                            {/* Submit Buttons */}
                            <div className="flex gap-2">
                                {question ? (
                                    <>
                                        <Button type="submit" className="flex-1">
                                            <Save className="mr-2 h-4 w-4" />
                                            Update Question
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                form.reset()
                                                onClose?.()
                                            }}
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <Button type="submit" className="w-full" disabled={statusCreate === 'pending'}>
                                        {statusCreate === 'pending' ?
                                            (<Loader className='h-4 w-4 animate-spin' />)
                                            : (
                                                <>
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Add Question
                                                </>
                                            )}

                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

type FormValues = z.infer<typeof QuestionSchema>;

interface QuestionSettingsProps {
    control: Control<FormValues>;
}

function QuestionSettings({ control }: QuestionSettingsProps) {
    const [showRatingScaleEditor, setShowRatingScaleEditor] = useState(false);

    const { field: ratingScaleField } = useController({
        name: 'ratingScale',
        control,
        defaultValue: defaultRatingScale
    });

    const { field: requiredField } = useController({
        name: 'required',
        control
    });

    const { field: allowCommentsField } = useController({
        name: 'allowComments',
        control
    });

    const handleRatingScaleChange = (index: number, description: string) => {
        const updatedScale = [...ratingScaleField.value];
        updatedScale[index] = {
            ...updatedScale[index],
            description
        };
        ratingScaleField.onChange(updatedScale);
    };

    return (
        <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label>Required Question</Label>
                    <p className="text-sm text-muted-foreground">
                        Make this question mandatory
                    </p>
                </div>
                <Switch
                    checked={requiredField.value}
                    onCheckedChange={requiredField.onChange}
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label>Allow Comments</Label>
                    <p className="text-sm text-muted-foreground">
                        Enable additional comments for this question
                    </p>
                </div>
                <Switch
                    checked={allowCommentsField.value}
                    onCheckedChange={allowCommentsField.onChange}
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Rating Scale</Label>
                        <p className="text-sm text-muted-foreground">
                            Customize the rating scale
                        </p>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowRatingScaleEditor(!showRatingScaleEditor)}
                    >
                        <Settings2 className="h-4 w-4 mr-2" />
                        {showRatingScaleEditor ? 'Hide' : 'Customize'}
                    </Button>
                </div>

                {showRatingScaleEditor && (
                    <div className="space-y-2 mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Rating</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ratingScaleField.value.map((scale, index) => (
                                    <TableRow key={scale.id}>
                                        <TableCell className="font-medium">{scale.rating}</TableCell>
                                        <TableCell>
                                            <Input
                                                value={scale.description}
                                                onChange={(e) =>
                                                    handleRatingScaleChange(index, e.target.value)
                                                }
                                                placeholder={`Description for rating ${scale.rating}`}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
}