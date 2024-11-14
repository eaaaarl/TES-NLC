import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse, deleteCourse, updateCourse } from "./action";
import { CourseValues } from "@/lib/validation";

interface Courses {
  course_id?: string;
  courseName: string;
}

export function useCreateCourseSchema() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCourse,
    onMutate: async (newCourse) => {
      await queryClient.cancelQueries({ queryKey: ["courses"] });

      const prevCourse = queryClient.getQueryData<Courses[]>(["courses"]);

      queryClient.setQueryData<Courses[]>(["courses"], (oldData) => {
        if (oldData) {
          return [...oldData, newCourse];
        } else {
          return [newCourse];
        }
      });
      return { prevCourse };
    },
    onError: (error, _newCourse, context) => {
      queryClient.setQueryData(["courses"], context?.prevCourse);

      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to create course",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
  return mutation;
}

export function useDeleteCourse() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCourse,
    onMutate: async (courseID) => {
      await queryClient.cancelQueries({ queryKey: ["courses"] });

      const prevCourse = queryClient.getQueryData<Courses[]>(["courses"]);

      queryClient.setQueryData<Courses[]>(["courses"], (oldData) => {
        return oldData?.filter((c) => c.course_id !== courseID);
      });

      return { prevCourse };
    },
    onError: (error, _courseID, context) => {
      queryClient.setQueryData(["courses"], context?.prevCourse);

      console.error(error);
      toast({
        title: "Failed to delete course",
        variant: "destructive",
        description: error.message,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  return mutation;
}

export function useUpdateCourse() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: CourseValues }) =>
      updateCourse(id, values),
    onMutate: async ({ id, values }) => {
      await queryClient.cancelQueries({ queryKey: ["courses"] });

      const prevCourses = queryClient.getQueryData<Courses[]>(["courses"]);

      queryClient.setQueryData<Courses[]>(["courses"], (oldData) => {
        if (!oldData) return [];
        return oldData.map((course) =>
          course.course_id === id ? { ...course, ...values } : course
        );
      });

      return { prevCourses };
    },
    onError: (error, _id, context) => {
      queryClient.setQueryData(["courses"], context?.prevCourses);
      console.error(error);
      toast({
        variant: "destructive",
        description: `Error updating course: ${error.message}`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
