"use client";

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
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from shadcn
import { Course } from "@/lib/types";
import ky from "ky";
import { GetStaticProps } from "next";


interface SelectCourseProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
}

export const getStaticProps: GetStaticProps = async () => {
  const courses: Course[] = await ky
    .get(`/api/admin/courses/all-course`)
    .json();

  return {
    props: {
      courses,
    },
    // Revalidate every 60 seconds (optional if not using manual revalidate)
    revalidate: 60,
  };
};

export default function SelectCourse({ field }: SelectCourseProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => ky.get(`/api/admin/courses/all-course`).json<Course[]>(),
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
            <SelectGroup className="overflow-x-auto w-full">
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
                  <SelectItem key={course.course_id} value={course.course_id}>
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
