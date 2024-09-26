/*eslint-disable, @typescript-eslint/no-explicit-any*/
"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from shadcn

interface Course {
  course_id: string;
  courseName: string;
}

const allCourse = async () => {
  const res = await fetch(`/api/admin/courses/all-course`);
  const data = await res.json();
  return data;
};

interface SelectCourseProps {
  field: any; // Accept the field object from useForm
}

export default function SelectCourse({ field }: SelectCourseProps) {
  const { data, isLoading } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: allCourse,
  });

  return (
    <FormItem>
      <FormLabel>Degree Program</FormLabel>
      <FormControl>
        <Select
          onValueChange={(value) => field.onChange(value)}
          defaultValue={field.value}
        >
          <SelectTrigger className="mt-1 w-full">
            <SelectValue placeholder="Select Degree Program" />
          </SelectTrigger>
          <SelectContent>
            {isLoading ? (
              <>
                <div className="p-2">
                  <Skeleton className="h-6 w-full" />
                </div>
                <div className="p-2">
                  <Skeleton className="h-6 w-full" />
                </div>
                <div className="p-2">
                  <Skeleton className="h-6 w-full" />
                </div>
              </>
            ) : (
              // Use SelectItem when data is loaded
              data?.map((course) => (
                <SelectItem key={course.course_id} value={course.course_id}>
                  {course.courseName}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
