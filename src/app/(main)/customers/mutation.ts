import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteStudent } from "./action";
import { useToast } from "@/hooks/use-toast";

export function useDeleteStudent() {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: DeleteStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            toast({
                title: 'Delete Student successfully'
            })
        },
        onError: (error: unknown) => {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
            console.error("Error creating student:", error);
            toast({
                variant: "destructive",
                description: errorMessage,
            });
        },
    })

    return mutation;
}