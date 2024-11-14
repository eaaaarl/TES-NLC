import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSection, deleteSection, updateSection } from "./action";
import { SectionValues } from "@/lib/validation";
import { Sections } from "@/lib/types";

export function useCreateSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Failed to create section",
        variant: "destructive",
        description: error.message,
      });
    },
  });
}

export function useUpdateSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      sectionId,
      values,
    }: {
      sectionId: string;
      values: SectionValues;
    }) => updateSection(values, sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });
}

export function useDeleteSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSection,

    onMutate: async (deleteSectionId: string) => {
      await queryClient.cancelQueries({ queryKey: ["sections"] });

      const previousSections = queryClient.getQueryData<Sections[]>([
        "sections",
      ]);

      queryClient.setQueryData<Sections[]>(["sections"], (oldData) => {
        if (!oldData) return [];

        return oldData.filter((section) => section.id !== deleteSectionId);
      });

      return { previousSections };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },

    onError: (error, _deleteSectionId, context) => {
      console.error(error);

      if (context?.previousSections) {
        queryClient.setQueryData(["sections"], context.previousSections);
      }

      toast({
        variant: "destructive",
        description: error.message,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
}
