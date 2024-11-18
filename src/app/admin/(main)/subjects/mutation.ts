import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubject, deleteSubject, updateSubject } from "./action";
import { SubjectValues } from "@/lib/validation";

export function useUpdateSubject() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      subject_id,
      payload,
    }: {
      subject_id: string;
      payload: SubjectValues;
    }) => updateSubject(subject_id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      toast({
        description: "Subject updated.",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to create subject. Please try again.",
      });
    },
  });
}

export function useDeleteSubject() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      toast({
        description: "Subject deleted.",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to create subject. Please try again.",
      });
    },
  });
}

export function useCreateSubject() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubject,
    onSuccess: (newSubject) => {
      const {} = newSubject.meta || {};
      toast({
        description: "Subject created.",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to create subject. Please try again.",
      });
    },
  });
}
