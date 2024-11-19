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
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SubjectSelectionDialogProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    academicYear: AcademicYear | null;
    Subjects: Subject[];
    YearLevel: YearLevel[];
    selectedYearLevel: YearLevel | null;
    selectedSection: Sections | null;
    loading?: boolean;
}

const SubjectSelectionDialog = ({
    showModal,
    setShowModal,
    academicYear,
    YearLevel,
    Subjects,
    loading = false,
    selectedYearLevel,
    selectedSection,
}: SubjectSelectionDialogProps) => {
    const { toast } = useToast()
    const [currentSelection, setCurrentSelection] = useState<string>("");
    const form = useForm({
        resolver: zodResolver(StudentAssignSectionYearLevelSubject),
        defaultValues: {
            yearLevelId: "",
            sectionId: "",
            subjectIds: [] as { id: string }[]
        }
    });

    const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);

    const [yearLevelChange, setYearLevelChange] = useState<string | null>(selectedYearLevel?.id ?? null);
    const [selectedYearLevelState, setSelectedYearLevelState] = useState<YearLevel | null>(selectedYearLevel);
    const [selectedSectionState, setSelectedSectionState] = useState<Sections | null>(selectedSection);


    const { data: sectionByYearLevel, isLoading: isLoadingSections } = useQuery({
        queryKey: ['students', 'selection-section', yearLevelChange],
        queryFn: async (): Promise<{ data: Sections[] }> => {
            if (!yearLevelChange) return { data: [] }
            const response = await fetch(`/api/student/selection/getSectionByYearLevel?yearLevelId=${yearLevelChange}`);
            if (!response.ok) throw new Error('Failed to get the section by yearLevelId')
            return response.json();
        },
        enabled: !!yearLevelChange
    })

    const handleYearLevelChange = (value: string) => {
        const selectedLevel = YearLevel.find(y => y.id === value);
        setSelectedYearLevelState(selectedLevel || null);

        form.setValue('yearLevelId', value);
        form.setValue('sectionId', '')
        setSelectedSectionState(null);
        setYearLevelChange(value);
    };

    const handleSectionChange = (value: string) => {
        const selectedSec = sectionByYearLevel?.data.find((s) => s.id === value)
        setSelectedSectionState(selectedSec || null)

        form.setValue('sectionId', value)
    }

    const handleSubjectSelect = (subjectId: string) => {
        const subject = Subjects.find(s => s.id === subjectId);
        if (subject) {
            if (selectedSubjects.some(s => s.id === subjectId)) {
                setSelectedSubjects(prev => prev.filter(s => s.id !== subjectId));
            } else {
                setSelectedSubjects(prev => [...prev, subject]);
                setCurrentSelection(subjectId);
            }
        }
    };

    const removeSubject = (subjectId: string) => {
        setSelectedSubjects(prev => prev.filter(s => s.id !== subjectId));
        setCurrentSelection("");
    };

    const resetForm = () => {
        setSelectedYearLevelState(selectedYearLevel);
        setSelectedSectionState(selectedSection);
        setYearLevelChange(selectedYearLevel?.id ?? null);
        setSelectedSubjects([]);
        setCurrentSelection("");

        form.reset({
            yearLevelId: selectedYearLevel?.id ?? "",
            sectionId: selectedSection?.id ?? "",
            subjectIds: []
        });
    };

    const getCurrentSelectionDisplay = () => {
        const currentSubject = Subjects.find(s => s.id === currentSelection)
        if (currentSubject) {
            return `${currentSubject.subjectName} (${currentSubject.subject_code})`
        }
        return "Select Subjects"
    }

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
        console.log(payload)
        /*   mutate(payload, {
              onSuccess: () => {
                  toast({
                      description: 'Selections updated successfully!'
                  })
                  setShowModal(false)
                  resetForm();
              }
          }) */
    }

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-2xl flex flex-col p-6">
                <DialogHeader className="pb-4">
                    <DialogTitle>Select Your Details</DialogTitle>
                    <DialogDescription>
                        Please select your section, year level, and subjects for {academicYear?.year || 'NO'} - {academicYear?.semester || 'ACTIVE SEM'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitSelection)} className="space-y-6">
                        <div className='grid grid-cols-1'>
                            <p className='mb-3'>College of Information Technology Education</p>
                            <hr />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="yearLevelId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year Level</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={handleYearLevelChange}
                                                value={field.value || selectedYearLevel?.id}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select year level">
                                                        {selectedYearLevelState ?
                                                            selectedYearLevelState.yearName.toUpperCase() :
                                                            "Select year level"
                                                        }
                                                    </SelectValue>
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
                            <FormField
                                control={form.control}
                                name="sectionId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Section</FormLabel>
                                        <FormControl>
                                            <Select
                                                disabled={!yearLevelChange}
                                                onValueChange={handleSectionChange}
                                                value={field.value || selectedSection?.id}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Section"
                                                    >
                                                        {selectedSectionState && field.value ?
                                                            selectedSectionState?.sectionName :
                                                            (selectedSectionState ? "Select section" : "Select year level first")
                                                        }
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {isLoadingSections ? (
                                                            <>
                                                                <div className="p-2">
                                                                    <Skeleton className="h-5 w-full" />
                                                                </div>
                                                                <div className="p-2">
                                                                    <Skeleton className="h-5 w-full" />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <SelectGroup>
                                                                {sectionByYearLevel?.data?.map((s) => (
                                                                    <SelectItem key={s.id} value={s.id}>
                                                                        {s.sectionName}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        )}
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
                                        <FormControl>
                                            <Select
                                                value={currentSelection}
                                                onValueChange={handleSubjectSelect}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder='Select Subjects'>
                                                        {getCurrentSelectionDisplay()}
                                                    </SelectValue>
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
                                                                            <Badge variant="default" className="ml-auto">
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
                                        {selectedSubjects.length > 0 && (
                                            <ScrollArea className='h-[200px]'>
                                                <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-muted/50">
                                                    {selectedSubjects.map((subject) => (
                                                        <Badge
                                                            key={subject.id}
                                                            variant="default"
                                                            className="flex items-center gap-1 pl-3 pr-1 py-1"
                                                        >
                                                            <span>
                                                                {subject.subjectName} ({subject.subject_code})
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeSubject(subject.id)
                                                                }
                                                                className="ml-1 hover:bg-secondary/80 rounded-full p-1"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setShowModal(false)
                                    resetForm?.()
                                }}
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