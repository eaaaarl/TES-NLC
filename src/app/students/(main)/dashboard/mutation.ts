import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitSelection } from "./action";

export function useSubmitSelection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitSelection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students", "selection"] });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to submit selection",
      });
    },
  });
}
