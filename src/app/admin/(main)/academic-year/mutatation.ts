import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAcademicYear,
  deleteAcademicYear,
  updateAcademicYear,
} from "./action";
import { academicYearValues } from "@/lib/validation";

export function useCreateAcademicYear() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAcademicYear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-year"] });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to create academic year",
      });
    },
  });

  return mutation;
}

export function useUpdateAcademicYear() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      id,
    }: {
      payload: academicYearValues;
      id: string;
    }) => updateAcademicYear(payload, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-year"] });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to create academic year",
      });
    },
  });
}

export function useDeleteAcademicYear() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAcademicYear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-year"] });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        description:
          error.message || "Failed to delete academic year. Please try again.",
      });
    },
  });
}
