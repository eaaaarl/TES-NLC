"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  GraduationCap,
  Activity,
  School,
  Presentation,
  UserCheck,
  Building2,
  Users2
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DepartmentPerformanceChart } from '@/components/Charts/DepartmentPerformance';
import { EvaluationCalendar } from '@/components/EvaluationCalendar';

// Mock data for the evaluation trends
const evaluationTrends = [
  { month: 'Jan', score: 4.2 },
  { month: 'Feb', score: 4.5 },
  { month: 'Mar', score: 4.3 },
  { month: 'Apr', score: 4.6 },
  { month: 'May', score: 4.7 },
  { month: 'Jun', score: 4.4 },
  { month: 'Jul', score: 4.5 },
  { month: 'Aug', score: 4.6 },
  { month: 'Sep', score: 4.8 },
  { month: 'Oct', score: 4.7 },
  { month: 'Nov', score: 4.6 },
  { month: 'Dec', score: 4.9 },
];

// Mock data for recent evaluations
const recentEvaluations = [
  {
    faculty: "Dr. Sarah Anderson",
    department: "Computer Science",
    score: 4.8,
    email: "s.anderson@nemsu.edu",
    status: "Completed"
  },
  {
    faculty: "Prof. James Wilson",
    department: "Mathematics",
    score: 4.7,
    email: "j.wilson@nemsu.edu",
    status: "In Progress"
  },
  {
    faculty: "Dr. Maria Garcia",
    department: "Engineering",
    score: 4.9,
    email: "m.garcia@nemsu.edu",
    status: "Completed"
  },
  {
    faculty: "Prof. David Lee",
    department: "Physics",
    score: 4.6,
    email: "d.lee@nemsu.edu",
    status: "Pending"
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">
            Faculty Evaluation Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Academic Year 2024-2025, First Semester
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="2024-1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-1">2024-2025, 1st Sem</SelectItem>
              <SelectItem value="2023-2">2023-2024, 2nd Sem</SelectItem>
              <SelectItem value="2023-1">2023-2024, 1st Sem</SelectItem>
            </SelectContent>
          </Select>
          <Button>Generate Report</Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              +1,234 from last semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">123</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <div className="flex-1">Full-time: 89</div>
              <div className="flex-1">Part-time: 34</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Active Programs: 24</span>
              <span>Courses: 386</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13,428</div>
            <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
              <div>Students: 12,847</div>
              <div>Faculty: 123</div>
              <div>Staff: 412</div>
              <div>Admin: 46</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <Presentation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">486</div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Online: 128</span>
              <span>Hybrid: 165</span>
              <span>F2F: 193</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Evaluation Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Completed: 847</span>
              <span>Pending: 239</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Ratings</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5.0</div>
            <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
              <div>Teaching: 4.7</div>
              <div>Knowledge: 4.8</div>
              <div>Engagement: 4.5</div>
              <div>Materials: 4.4</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Student Engagement</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Active: 11,819</span>
              <span>Inactive: 1,028</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Left Section - Charts */}
        <div className="col-span-4 grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={evaluationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[3.5, 5]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <DepartmentPerformanceChart />
        </div>

        {/* Right Section - Calendar and Recent */}
        <div className="col-span-3 grid gap-4">
          <EvaluationCalendar />
          <Card>
            <CardHeader>
              <CardTitle>Recent Evaluations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentEvaluations.map((evaluation, i) => (
                  <div key={i} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {evaluation.faculty.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{evaluation.faculty}</p>
                      <p className="text-sm text-muted-foreground">{evaluation.department}</p>
                    </div>
                    <div className="ml-auto flex flex-col items-end">
                      <span className="text-sm font-medium">{evaluation.score}/5.0</span>
                      <Badge variant={
                        evaluation.status === "Completed" ? "default" :
                          evaluation.status === "In Progress" ? "destructive" : "secondary"
                      }>
                        {evaluation.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}