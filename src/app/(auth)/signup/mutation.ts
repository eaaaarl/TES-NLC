import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUpStudent } from "./action";
import { useToast } from "@/hooks/use-toast";

export function useSignUp() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: signUpStudent,
    onMutate: async (newStudent) => {
      await queryClient.cancelQueries({ queryKey: ["students"] });
      const prevStudent = queryClient.getQueryData(["students"]);
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["students"], (oldData: any) => {
        if (oldData) {
          return { ...oldData, ...newStudent };
        } else {
          return [newStudent];
        }
      });

      return { prevStudent };
    },
    onError: (error, _newStudent, context) => {
      queryClient.setQueryData(["students"], context?.prevStudent);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to signup",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}
