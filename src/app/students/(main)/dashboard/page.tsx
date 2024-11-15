"use client"
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  ClipboardList,
  GraduationCap,
  History,
  Star,
  User,
  Loader2,
  BookOpen
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SubjectSelectionDialog from "./_components/SelectionDialog";

// Mock Data for Selection Modal
const MOCK_DATA = {
  currentAcademicYear: {
    id: "ay1",
    year: "2024-2025",
    semester: "2nd Sem",
    isActive: true
  },
  sections: [
    { id: "sec1", sectionName: "BSIT-1A" },
    { id: "sec2", sectionName: "BSIT-1B" },
    { id: "sec3", sectionName: "BSIT-1C" },
  ],
  yearLevels: [
    { id: "yl1", yearName: "First Year" },
    { id: "yl2", yearName: "Second Year" },
    { id: "yl3", yearName: "Third Year" },
    { id: "yl4", yearName: "Fourth Year" },
  ],
  subjects: [
    { id: "sub1", subjectName: "Mathematics 101", subject_code: "MATH101" },
    { id: "sub2", subjectName: "Physics 201", subject_code: "PHYS201" },
    { id: "sub3", subjectName: "Chemistry 101", subject_code: "CHEM101" },
    { id: "sub4", subjectName: "Biology 201", subject_code: "BIO201" },
  ],
};

const StudentDashboard = () => {
  const [showModal, setShowModal] = useState(true); // Set to true to show on load
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedYearLevel, setSelectedYearLevel] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentSelections, setStudentSelections] = useState(null);

  // Sample data for existing dashboard
  const pendingEvaluations = [
    { teacher: "Dr. Santos", subject: "Mathematics 101", deadline: "Nov 20, 2024" },
    { teacher: "Prof. Garcia", subject: "Physics 201", deadline: "Nov 22, 2024" },
  ];

  const completedEvaluations = [
    { teacher: "Dr. Reyes", subject: "Chemistry 101", date: "Oct 15, 2024" },
    { teacher: "Prof. Cruz", subject: "Biology 201", date: "Oct 10, 2024" },
  ];

  const handleSubmit = async () => {
    if (!selectedSection || !selectedYearLevel || selectedSubjects.length === 0) {
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update selections
    setStudentSelections({
      section: MOCK_DATA.sections.find(s => s.id === selectedSection),
      yearLevel: MOCK_DATA.yearLevels.find(y => y.id === selectedYearLevel),
      subjects: MOCK_DATA.subjects.filter(s => selectedSubjects.includes(s.id))
    });

    setLoading(false);
    setShowModal(false);
  };

  const toggleSubject = (subjectId) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, Juan Dela Cruz</p>
          </div>
          <Button className="flex items-center gap-2">
            <User className="h-4 w-4" />
            View Profile
          </Button>
        </div>

        {/* Show warning if selections are not made */}
        {!studentSelections && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertDescription className="text-yellow-800">
              Please select your section, year level, and subjects for the current semester.
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ClipboardList className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-gray-600">Pending Evaluations</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Star className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <p className="text-gray-600">Completed Evaluations</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-purple-700" />
                </div>
                <div>
                  <p className="text-gray-600">Current Semester</p>
                  <p className="text-2xl font-bold">{MOCK_DATA.currentAcademicYear.semester}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-orange-700" />
                </div>
                <div>
                  <p className="text-gray-600">Selected Subjects</p>
                  <p className="text-2xl font-bold">{studentSelections?.subjects.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Evaluations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Pending Evaluations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingEvaluations.map((evaluation, index) => (
                    <TableRow key={index}>
                      <TableCell>{evaluation.teacher}</TableCell>
                      <TableCell>{evaluation.subject}</TableCell>
                      <TableCell>{evaluation.deadline}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Evaluate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Evaluation History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-green-600" />
                Recent Evaluations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date Completed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedEvaluations.map((evaluation, index) => (
                    <TableRow key={index}>
                      <TableCell>{evaluation.teacher}</TableCell>
                      <TableCell>{evaluation.subject}</TableCell>
                      <TableCell>{evaluation.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span className="font-medium">80%</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-sm text-gray-600 mt-2">
                You have completed 8 out of 10 required evaluations this semester.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Selection Modal */}
        <SubjectSelectionDialog
          showModal={showModal}
          setShowModal={setShowModal}
          MOCK_DATA={MOCK_DATA}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          selectedYearLevel={selectedYearLevel}
          setSelectedYearLevel={setSelectedYearLevel}
          selectedSubjects={selectedSubjects}
          toggleSubject={toggleSubject}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default StudentDashboard;