import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CategorySchema, categoryValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, Plus, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCreateCategory, useUpdateCategory } from '../mutation';
import { useToast } from '@/hooks/use-toast';

interface CategoryFormProps {
    category?: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
    onClose?: () => void;
    className?: string;
}

export default function CategoryForm({ category, onClose, className }: CategoryFormProps) {
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            categoryName: ''
        }
    });


    useEffect(() => {
        if (category) {
            form.reset({
                categoryName: category.name
            });
        } else {
            form.reset({
                categoryName: ''
            });
        }
    }, [category, form]);

    const { mutate: createCategory, status: statusCategory } = useCreateCategory();
    const { mutate: updateCategory, status: statusUpdateCategory } = useUpdateCategory();

    const submitCategory = (payload: categoryValues) => {
        if (category) {
            updateCategory({ payload, id: category.id }, {
                onSuccess: () => {
                    toast({
                        description: 'Category updated.'
                    });
                    form.reset();
                    onClose?.();
                }
            })
        } else {
            createCategory(payload, {
                onSuccess: () => {
                    toast({
                        description: 'Category created.'
                    });
                    form.reset();
                    onClose?.();
                }
            });
        }

    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{category ? 'Edit Category' : 'Create Category'}</CardTitle>
                <CardDescription>
                    {category ? 'Update category details' : 'Create a new category'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitCategory)}>
                        <FormField
                            control={form.control}
                            name='categoryName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {category ?
                            (
                                <>
                                    <div className='flex'>
                                        <Button
                                            className='mt-4 mr-3 w-full'
                                            disabled={statusUpdateCategory === 'pending'}
                                        >
                                            {statusUpdateCategory === 'pending' ? (
                                                <Loader className='h-4 w-4 animate-spin' />
                                            ) : (
                                                <>
                                                    <Save className="h-4 w-4 mr-2" />
                                                    Update
                                                </>
                                            )}
                                        </Button>

                                        <Button
                                            type='button'
                                            variant={'outline'}
                                            className='mt-4 '
                                            onClick={() => {
                                                form.reset()
                                                onClose?.()
                                            }}
                                        >
                                            <X className='mr-2 h-4 w-4' />
                                            Cancel
                                        </Button>
                                    </div>

                                </>

                            ) :
                            (<Button
                                className='mt-4 w-full'
                                disabled={statusCategory === 'pending'}
                            >
                                {statusCategory === 'pending' ? (
                                    <Loader className='h-4 w-4 animate-spin' />
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create
                                    </>
                                )}
                            </Button>)}

                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}