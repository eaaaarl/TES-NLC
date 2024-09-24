import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse, deleteCourse, updateCourse } from "./action";
import { CourseValues } from "@/lib/validation";

export function useCreateCourseSchema() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createCourse,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
            toast({
                description: "Course created successfully",
            });
        },
        onError: (error: unknown) => {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred.";
            console.error("Error creating course:", error);
            toast({
                variant: "destructive",
                description: errorMessage,
            });
        },
    });
    return mutation;
}

export function useDeleteCourse() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteCourse,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            toast({
                title: 'Course Deleted Successfully!'
            })
        },
        onError: (error: unknown) => {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred.";
            console.error("Error creating course:", error);
            toast({
                variant: "destructive",
                description: errorMessage,
            });
        },
    })

    return mutation;
}

export function useUpdateCourse() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, values }: { id: string, values: CourseValues }) => updateCourse(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] })
            toast({
                title: 'Course Updated Successfully!'
            })
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                description: `Error updating student: ${error.message}`,
            });
        },
    })
}