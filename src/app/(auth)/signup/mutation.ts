import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUpStudent } from "./action";
import { useToast } from "@/hooks/use-toast";

export function useSignUp() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: signUpStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students", "registration"] });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to sign up",
      });
    },
  });
}
