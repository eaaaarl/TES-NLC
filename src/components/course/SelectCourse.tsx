import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Course } from "@/lib/types";
import ky from "ky";

interface SelectCourseProps {
  field: {
    value: string;
    onChange: (value: string) => void;
    name: string;
  };
  onCourseChange: (courseId: string) => void;
}

export default function SelectCourse({
  field,
  onCourseChange,
}: SelectCourseProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => ky.get(`/api/admin/courses/all-course`).json<Course[]>(),
    staleTime: 10000,
  });

  const handleChange = (value: string) => {
    field.onChange(value);
    onCourseChange(value);
  };

  return (
    <FormItem>
      <FormLabel>Degree Program</FormLabel>
      <FormControl>
        <Select
          value={field.value || ""}
          onValueChange={handleChange}
        >
          <SelectTrigger className="mt-1 w-full">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
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
                data?.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.courseName}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}