import { useMutation, useQueryClient } from "@tanstack/react-query";
import createStudent from "./action";
import { useToast } from "@/hooks/use-toast";

export function useCreateStudentSchema() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            toast({
                description: "Student created successfully",
            });
        },
        onError: (error: unknown) => {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
            console.error("Error creating student:", error);
            toast({
                variant: "destructive",
                description: errorMessage,
            });
        },
    });

    return mutation;
}
