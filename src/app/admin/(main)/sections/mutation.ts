import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSection } from "./action";

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
        variant: "destructive",
        description: "Failed to create sections",
      });
    },
  });
}
