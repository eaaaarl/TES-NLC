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

      // Optimistic update: update the cache immediately with new student
      queryClient.setQueryData(["students"], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            data: [...oldData.data, newStudent], // Optimistically add the new student
            meta: {
              ...oldData.meta,
              total: oldData.meta.total + 1, // Update the total number of students
            },
          };
        } else {
          // Initial case, if there's no existing data
          return {
            data: [newStudent],
            meta: { total: 1, page: 1, pageSize: 5, pageCount: 1 },
          };
        }
      });

      // Return the previous data to allow rollback in case of error
      return { prevStudent };
    },
    onError: (error, _newStudent, context) => {
      // Rollback to previous data if mutation fails
      queryClient.setQueryData(["students"], context?.prevStudent);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to sign up",
      });
    },
    onSuccess: (response) => {
      // After successful mutation, ensure cache is updated with the server's response
      queryClient.setQueryData(["students"], (oldData: any) => {
        return {
          ...response, // Use the server response to ensure correct data
        };
      });
    },
    onSettled: () => {
      // Always refetch after mutation to ensure the data is fresh and synced with the server
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}
