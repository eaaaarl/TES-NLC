import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubject, deleteSubject, updateSubject } from "./action";
import { SubjectValues } from "@/lib/validation";


export function useUpdateSubject() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: ({ subject_id, values }: { subject_id: string, values: SubjectValues }) => updateSubject(subject_id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] })
            toast({
                description: "Subject Updated successfully",
            })
        },
        onError(error) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to delete subject. Please try again.",
            });
        },
    })

    return mutation;
}

export function useDeleteSubject() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteSubject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] })
            toast({
                description: "Subject deleted successfully",
            })
        },
        onError(error) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to delete subject. Please try again.",
            });
        },
    })

    return mutation;
}

export function useCreateSubject() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createSubject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] })
            toast({
                description: "Subject created successfully",
            })
        },
        onError(error) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to create subject. Please try again.",
            });
        },
    })

    return mutation;
}