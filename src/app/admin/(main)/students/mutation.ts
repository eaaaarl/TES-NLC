import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent } from "./action";
import { Students } from "@/lib/types";

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deleteStudent,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["students"] });
      const prevStudents = queryClient.getQueryData<Students[]>(["students"]);

      queryClient.setQueryData<Students[]>(["students"], (oldData = []) => {
        return oldData.filter((student) => student.id !== id);
      });

      return { prevStudents };
    },
    onError: (err, _variables, context) => {
      queryClient.setQueryData(["students"], context?.prevStudents);
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to delete student",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}
