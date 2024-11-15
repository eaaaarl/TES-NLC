import React from 'react';
import { Loader2, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SubjectSelectionDialog = ({
    showModal,
    setShowModal,
    MOCK_DATA,
    selectedSection,
    setSelectedSection,
    selectedYearLevel,
    setSelectedYearLevel,
    selectedSubjects,
    toggleSubject,
    loading,
    handleSubmit
}) => {
    // Find selected subject details for badges
    const getSelectedSubjectDetails = (subjectId) => {
        return MOCK_DATA.subjects.find(subject => subject.id === subjectId);
    };

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Select Your Details</DialogTitle>
                    <DialogDescription>
                        Please select your section, year level, and subjects for {MOCK_DATA.currentAcademicYear.year} - {MOCK_DATA.currentAcademicYear.semester}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Section</label>
                            <Select value={selectedSection} onValueChange={setSelectedSection}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select section" />
                                </SelectTrigger>
                                <SelectContent>
                                    {MOCK_DATA.sections.map((section) => (
                                        <SelectItem key={section.id} value={section.id}>
                                            {section.sectionName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Year Level</label>
                            <Select value={selectedYearLevel} onValueChange={setSelectedYearLevel}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select year level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {MOCK_DATA.yearLevels.map((yearLevel) => (
                                        <SelectItem key={yearLevel.id} value={yearLevel.id}>
                                            {yearLevel.yearName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Subjects</label>
                        {selectedSubjects.length > 0 && (
                            <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/50 min-h-12">
                                {selectedSubjects.map((subjectId) => {
                                    const subject = getSelectedSubjectDetails(subjectId);
                                    return (
                                        <div
                                            key={subject.id}
                                            className="flex items-center gap-1 px-2 py-1 text-sm bg-primary text-primary-foreground rounded-md"
                                        >
                                            <span>{subject.subjectName} ({subject.subject_code})</span>
                                            <button
                                                onClick={() => toggleSubject(subject.id)}
                                                className="hover:bg-primary-foreground/20 rounded-full p-1"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        <ScrollArea className="h-[300px] border rounded-md p-4">
                            <div className="grid grid-cols-1 gap-2">
                                {MOCK_DATA.subjects.map((subject) => (
                                    <Card
                                        key={subject.id}
                                        className={`p-3 cursor-pointer transition-colors ${selectedSubjects.includes(subject.id)
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted'
                                            }`}
                                        onClick={() => toggleSubject(subject.id)}
                                    >
                                        <div className="font-medium">{subject.subjectName}</div>
                                        <div className="text-sm opacity-90">{subject.subject_code}</div>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setShowModal(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || !selectedSection || !selectedYearLevel || selectedSubjects.length === 0}
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Selections
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubjectSelectionDialog;