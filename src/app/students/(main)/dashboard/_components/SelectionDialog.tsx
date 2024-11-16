"use client"
import React, { useState, useEffect } from 'react';
import { Check, Loader2, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AcademicYear, Sections, Subject, YearLevel } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StudentAssignSectionYearLevelSubject, studentAssignSectionYearLevelSubjectValues } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useSubmitSelection } from '../mutation';
import { useToast } from '@/hooks/use-toast';

interface SubjectSelectionDialogProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    academicYear: AcademicYear | null;
    Subjects: Subject[];
    Section: Sections[];
    YearLevel: YearLevel[];
    selectedYearLevel: YearLevel | null;
    selectedSection: Sections | null;
    loading?: boolean;
}

const SubjectSelectionDialog = ({
    showModal,
    setShowModal,
    academicYear,
    Section,
    YearLevel,
    Subjects,
    loading = false,
    selectedYearLevel,
    selectedSection,
}: SubjectSelectionDialogProps) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: zodResolver(StudentAssignSectionYearLevelSubject),
        defaultValues: {
            yearLevelId: "",
            sectionId: "",
            subjectIds: [] as { id: string }[]
        }
    });

    const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);

    const handleSubjectSelect = (subjectId: string) => {
        const subject = Subjects.find(s => s.id === subjectId);
        if (subject) {
            if (selectedSubjects.some(s => s.id === subjectId)) {
                setSelectedSubjects(prev => prev.filter(s => s.id !== subjectId));
            } else {
                setSelectedSubjects(prev => [...prev, subject]);
            }
        }
    };

    const removeSubject = (subjectId: string) => {
        setSelectedSubjects(prev => prev.filter(s => s.id !== subjectId));
    };

    const resetForm = () => {
        form.reset({
            yearLevelId: selectedYearLevel?.id ?? "",
            sectionId: selectedSection?.id ?? "",
            subjectIds: []
        });
        setSelectedSubjects([]);
    };

    useEffect(() => {
        const subjectIds = selectedSubjects.map(subject => ({ id: subject.id }));
        form.setValue('subjectIds', subjectIds);
    }, [selectedSubjects, form]);

    useEffect(() => {
        form.reset({
            yearLevelId: selectedYearLevel?.id ?? "",
            sectionId: selectedSection?.id ?? ""
        })
    }, [form, selectedYearLevel, selectedSection])

    const { mutate, status } = useSubmitSelection();

    const submitSelection = (payload: studentAssignSectionYearLevelSubjectValues) => {
        mutate(payload, {
            onSuccess: () => {
                toast({
                    description: 'Selections updated successfully!'
                })
                setShowModal(false)
                resetForm();
            }
        })
    }

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-2xl flex flex-col p-6">
                <DialogHeader className="pb-4">
                    <DialogTitle>Select Your Details</DialogTitle>
                    <DialogDescription>
                        Please select your section, year level, and subjects for {academicYear?.year} - {academicYear?.semester}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitSelection)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="sectionId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Section</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select section" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {Section?.map((section) => (
                                                            <SelectItem key={section.id} value={section.id}>
                                                                {section.sectionName}
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

                            <FormField
                                control={form.control}
                                name="yearLevelId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year Level</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select year level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {YearLevel?.map((y) => (
                                                            <SelectItem key={y.id} value={y.id}>
                                                                {y.yearName.toUpperCase()}
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
                        </div>

                        <FormField
                            control={form.control}
                            name="subjectIds"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Subjects</FormLabel>
                                    <div className="space-y-4">
                                        {selectedSubjects.length > 0 && (
                                            <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-muted/50 min-h-[60px]">
                                                {selectedSubjects.map((subject) => (
                                                    <Badge
                                                        key={subject.id}
                                                        variant="outline"
                                                        className="flex items-center gap-1 pl-3 pr-1 py-1"
                                                    >
                                                        <span>
                                                            {subject.subjectName} ({subject.subject_code})
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSubject(subject.id)}
                                                            className="ml-1 hover:bg-secondary/80 rounded-full p-1"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        <FormControl>
                                            <Select
                                                onValueChange={handleSubjectSelect}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select subjects" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[300px]">
                                                    <SelectGroup>
                                                        {Subjects.map((subject) => {
                                                            const isSelected = selectedSubjects.some(s => s.id === subject.id);
                                                            return (
                                                                <SelectItem
                                                                    key={subject.id}
                                                                    value={subject.id}
                                                                    className="flex items-center justify-between pr-2"
                                                                >
                                                                    <div className="flex items-center justify-between w-full gap-2">
                                                                        <div className="flex-1">
                                                                            <span className="font-medium">
                                                                                {subject.subjectName}
                                                                            </span>
                                                                            <span className="ml-2 text-muted-foreground">
                                                                                ({subject.subject_code})
                                                                            </span>
                                                                        </div>
                                                                        {isSelected && (
                                                                            <Badge variant="secondary" className="ml-auto">
                                                                                <Check className="h-3 w-3 mr-1" />
                                                                                Selected
                                                                            </Badge>
                                                                        )}
                                                                    </div>
                                                                </SelectItem>
                                                            );
                                                        })}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowModal(false)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={status === 'pending' || !selectedSubjects.length}
                            >
                                {status === 'pending' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Selections
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default SubjectSelectionDialog;