"use client"
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const StudentEvaluation = () => {
  // Sample faculty list
  const [facultyList] = useState([
    {
      facultyName: "Dr. Maria Santos",
      subject: "Mathematics 101",
      schedule: "MWF 9:00-10:30 AM",
      photoUrl: "/api/placeholder/200/200",
      department: "Mathematics Department",
      position: "Associate Professor"
    },
    {
      facultyName: "Dr. John Smith",
      subject: "Physics 101",
      schedule: "TTH 1:00-2:30 PM",
      photoUrl: "/api/placeholder/200/200",
      department: "Physics Department",
      position: "Assistant Professor"
    },
    // Add more faculty members as needed
  ]);

  const [currentFacultyIndex, setCurrentFacultyIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [evaluations, setEvaluations] = useState({});

  const currentFaculty = facultyList[currentFacultyIndex];

  const handleNext = () => {
    if (currentFacultyIndex < facultyList.length - 1) {
      setCurrentFacultyIndex(prev => prev + 1);
      setProgress(((currentFacultyIndex + 1) / facultyList.length) * 100);
    }
  };

  const handlePrevious = () => {
    if (currentFacultyIndex > 0) {
      setCurrentFacultyIndex(prev => prev - 1);
      setProgress(((currentFacultyIndex - 1) / facultyList.length) * 100);
    }
  };

  const evaluationCriteria = {
    "A. COMMITMENT": [
      "1. Demonstrates thorough knowledge of the subject matter",
      "2. Starts and ends class on time",
      "3. Attends classes regularly",
      "4. Follows the course syllabus",
      "5. Makes good use of class time"
    ],
    "B. TEACHING EFFECTIVENESS": [
      "1. Presents lessons in a clear and organized manner",
      "2. Uses effective teaching methods and strategies",
      "3. Provides relevant examples and applications",
      "4. Uses appropriate instructional materials",
      "5. Encourages critical thinking and analysis"
    ],
    "C. CLASSROOM MANAGEMENT": [
      "1. Maintains a conducive learning environment",
      "2. Manages student behavior effectively",
      "3. Promotes active student participation",
      "4. Shows enthusiasm in teaching",
      "5. Handles questions and student concerns professionally"
    ],
    "D. ASSESSMENT METHODS": [
      "1. Gives fair and appropriate tests/assignments",
      "2. Returns checked papers promptly",
      "3. Provides constructive feedback",
      "4. Uses various assessment methods",
      "5. Explains grading system clearly"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress Bar */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Faculty {currentFacultyIndex + 1} of {facultyList.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Faculty Card - Centered Layout */}
        <Card className="border-t-4 border-t-blue-600">
          <CardHeader className="pb-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <img
                  src={currentFaculty.photoUrl}
                  alt={currentFaculty.facultyName}
                  className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="space-y-3">
                <CardTitle className="text-2xl text-blue-900">
                  {currentFaculty.facultyName}
                </CardTitle>
                <CardDescription className="text-base">
                  <div className="flex flex-col items-center space-y-1">
                    <span className="font-medium text-gray-700">{currentFaculty.subject}</span>
                    <span className="text-gray-600">{currentFaculty.department}</span>
                    <span className="text-gray-600">{currentFaculty.position}</span>
                    <span className="text-gray-500">{currentFaculty.schedule}</span>
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Evaluation Categories */}
        {Object.entries(evaluationCriteria).map(([category, criteria]) => (
          <Card key={category} className="border-l-4 border-l-blue-600">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 font-bold">
                {category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {criteria.map((criterion, index) => (
                  <div key={index} className="space-y-2">
                    <Label className="font-medium text-gray-700">
                      {criterion}
                    </Label>
                    <RadioGroup
                      className="flex justify-center gap-16"
                      defaultValue="3"
                      onValueChange={(value) => {
                        setEvaluations(prev => ({
                          ...prev,
                          [`${currentFaculty.facultyName}-${category}-${index}`]: value
                        }));
                      }}
                    >
                      {['POOR', 'FAIR', 'SATISFACTORY', 'VERY SATISFACTORY', 'OUTSTANDING'].map((value) => (
                        <div key={value} className="flex items-center gap-2">
                          <RadioGroupItem
                            value={value.toString()}
                            id={`${category}-${index}-${value}`}
                            className="h-4 w-4"
                          />
                          <Label
                            htmlFor={`${category}-${index}-${value}`}
                            className="text-sm text-gray-600"
                          >
                            {value}

                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <div className="border-b border-gray-200 mt-4"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Comments Section */}
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Comments and Suggestions</CardTitle>
            <CardDescription>
              Please provide any additional feedback for improvement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Share your thoughts and suggestions..."
              className="min-h-[100px]"
              onChange={(e) => {
                setEvaluations(prev => ({
                  ...prev,
                  [`${currentFaculty.facultyName}-comments`]: e.target.value
                }));
              }}
            />
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Faculty {currentFacultyIndex + 1} of {facultyList.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Navigation and Submit Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentFacultyIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNext}
                  disabled={currentFacultyIndex === facultyList.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">
                    Please review your responses before submitting
                  </span>
                </div>
                <Button>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Submit Evaluation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>


      </div>
    </div>
  );
};

export default StudentEvaluation;