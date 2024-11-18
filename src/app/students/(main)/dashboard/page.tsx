"use client"
import React, { useState, useEffect, ReactNode } from "react";
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
  Calendar,
  ClipboardList,
  GraduationCap,
  History,
  Star,
  User,
  BookOpen,
  Plus,
  LucideIcon
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SubjectSelectionDialog from "./_components/SelectionDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import MetricCard from "./_components/MetricCard";
const MetricCardSkeleton = () => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-6 w-[60px]" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Loading skeleton for tables
const TableSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-[200px]" />
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const StudentDashboard = () => {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter()
  const { data: studentData, isLoading: isLoadingStudent } = useQuery({
    queryKey: ['students', 'profile'],
    queryFn: async () => {
      const response = await fetch('/api/student/auth/profile');
      if (!response.ok) throw new Error('Failed to fetch student data');
      return response.json();
    }
  });

  const { data: selectionData, isLoading: isLoadingSelection } = useQuery({
    queryKey: ['students', 'selection'],
    queryFn: async () => {
      const response = await fetch('/api/student/selection');
      if (!response.ok) throw new Error('Failed to fetch selection data');
      return response.json();
    }
  });
  const academicYear = selectionData?.academicYear ?? null;

  const Subjects = selectionData?.selectionData?.subjects ?? [];
  const YearLevel = selectionData?.selectionData?.yearLevels ?? [];
  const Section = selectionData?.selectionData?.sections ?? [];

  const needSelection = selectionData?.student?.needsSelection ?? false;
  const selectedSection = selectionData?.student?.currentSelections?.section ?? null;
  const selectedYearLevel = selectionData?.student?.currentSelections?.section?.yearLevel ?? null;
  const countSubject = selectionData?.student?.currentSelections?.subjects?.length ?? 0;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!academicYear) {
      setShowModal(false);
    } else {
      if (needSelection && !showModal) {
        timer = setTimeout(() => setShowModal(true), 3000);
      }
      return () => timer && clearTimeout(timer);
    }
  }, [needSelection, showModal]);

  useEffect(() => {
    if (!academicYear) {
      setShowModal(false);
    } else {
      setShowModal(needSelection);
    }
  }, [needSelection, academicYear]);

  const pendingEvaluations = [
    { teacher: "Dr. Santos", subject: "Mathematics 101", deadline: "Nov 20, 2024" },
    { teacher: "Prof. Garcia", subject: "Physics 201", deadline: "Nov 22, 2024" },
  ];

  const completedEvaluations = [
    { teacher: "Dr. Reyes", subject: "Chemistry 101", date: "Oct 15, 2024" },
    { teacher: "Prof. Cruz", subject: "Biology 201", date: "Oct 10, 2024" },
  ];

  if (isLoadingStudent || isLoadingSelection) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-[250px]" />
              <Skeleton className="h-4 w-[350px]" />
            </div>
            <Skeleton className="h-10 w-[120px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <MetricCardSkeleton key={i} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TableSkeleton />
            <TableSkeleton />
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[50px]" />
                </div>
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, {studentData?.firstname} {studentData?.middlename} {studentData?.lastname}</p>
          </div>
          <Button
            onClick={() => router.push('/students/profile')}
            className="flex items-center gap-2"
            variant="outline"
          >
            <User className="h-4 w-4" />
            View Profile
          </Button>
        </div>

        {!academicYear && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertDescription className="text-yellow-800 font-medium">
              <strong>No Active Semester</strong>. Currently, there is no active semester set by the administrator or HR.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            icon={ClipboardList}
            label="Pending Evaluations"
            value="2"
            color="blue"
            badge="2 Pending"
          />

          <MetricCard
            icon={Star}
            label="Completed Evaluations"
            value="8"
            color="green"
            badge="8 Completed"
          />

          <MetricCard
            icon={GraduationCap}
            label="Current Semester"
            value={academicYear?.semester.toUpperCase() || <Badge variant={'secondary'} className="bg-purple-50 text-purple-700 hover:border-purple-100">No Active Sem</Badge>}
            badge={academicYear?.semester.toUpperCase() || <Badge variant={'secondary'} className="bg-purple-50 text-purple-700 hover:border-purple-100">No Active Sem</Badge>}
            color="purple"
          />

          <MetricCard
            icon={BookOpen}
            label="Selected Subjects"
            value={countSubject}
            color="orange"
            badge={`${countSubject} Total Subjects`}
            action={{
              icon: Plus,
              label: countSubject > 0 ? "Manage" : "Add"
            }}
            disabled={!academicYear}
            tooltipText={!academicYear
              ? "No active semester"
              : countSubject > 0
                ? "Manage your subjects"
                : "Add new subjects"
            }
            onClick={() => setShowModal(true)}
          />
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <Calendar className="h-5 w-5 text-blue-600" />
                Pending Evaluations
              </CardTitle>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {pendingEvaluations.length} pending
              </Badge>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingEvaluations.map((evaluation, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{evaluation.teacher}</TableCell>
                      <TableCell>{evaluation.subject}</TableCell>
                      <TableCell>{evaluation.deadline}</TableCell>
                      <TableCell className="text-right">
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

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <History className="h-5 w-5 text-green-600" />
                Recent Evaluations
              </CardTitle>
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                {completedEvaluations.length} completed
              </Badge>
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
                      <TableCell className="font-medium">{evaluation.teacher}</TableCell>
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
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-600" />
              Evaluation Progress
            </CardTitle>
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
        <SubjectSelectionDialog
          showModal={showModal}
          setShowModal={setShowModal}
          academicYear={academicYear}
          Section={Section}
          YearLevel={YearLevel}
          selectedSection={selectedSection}
          selectedYearLevel={selectedYearLevel}
          Subjects={Subjects}
          loading={isLoadingSelection}
        />
      </div>
    </div>
  );
};



export default StudentDashboard;