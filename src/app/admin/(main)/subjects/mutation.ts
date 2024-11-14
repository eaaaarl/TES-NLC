import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubject, deleteSubject, updateSubject } from "./action";
import { SubjectValues } from "@/lib/validation";
import { Subject } from "@/lib/types";
import { Meta } from "./SubjectTable";

export function useUpdateSubject() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      subject_id,
      values,
    }: {
      subject_id: string;
      values: SubjectValues;
    }) => updateSubject(subject_id, values),

    onSuccess: async (_data, variables) => {
      await queryClient.cancelQueries({
        queryKey: ["subjects"],
      });

      const previousData = queryClient.getQueriesData<{
        data: Subject[];
        meta: Meta;
      }>({
        queryKey: ["subjects"],
      });

      previousData.forEach(([queryKey, oldData]) => {
        queryClient.setQueryData<{ data: Subject[]; meta: Meta }>(
          queryKey,
          oldData
            ? {
                data: oldData.data.map((subject) =>
                  subject.id === variables.subject_id
                    ? { ...subject, ...variables.values }
                    : subject
                ),
                meta: oldData.meta,
              }
            : oldData
        );
      });

      toast({
        description: "Subject Updated.",
      });

      return { previousData };
    },

    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to update subject. Please try again.",
      });
    },
  });

  return mutation;
}

export function useDeleteSubject() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubject,
    onMutate: (deletedSubjectId) => {
      const queries = queryClient.getQueriesData<{
        data: Subject[];
        meta: Meta;
      }>({
        queryKey: ["subjects"],
      });

      const previousQueries = new Map(queries);

      queries.forEach(([queryKey, oldData]) => {
        if (!oldData) return;

        queryClient.setQueryData<{ data: Subject[]; meta: Meta }>(queryKey, {
          data: oldData.data.filter(
            (subject) => subject.id !== deletedSubjectId
          ),
          meta: {
            ...oldData.meta,
            total: oldData.meta.total - 1,
            pageCount: Math.ceil(
              (oldData.meta.total - 1) / oldData.meta.pageSize
            ),
          },
        });
      });

      return { previousQueries };
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to delete subject. Please try again.",
      });
    },
    onSuccess: () => {
      toast({
        description: "Subject deleted.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
  });
}

export function useCreateSubject() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubject,
    onMutate: async (newSubject: SubjectValues) => {
      await queryClient.cancelQueries({
        queryKey: ["subjects"],
      });

      const previousData = queryClient.getQueriesData<{
        data: Subject[];
        meta: Meta;
      }>({
        queryKey: ["subjects"],
      });

      const optimisticSubject: Subject = {
        id: `temp-${Date.now()}`,
        ...newSubject,
      };

      previousData.forEach(([queryKey, oldData]) => {
        queryClient.setQueryData<{ data: Subject[]; meta: Meta }>(
          queryKey,
          oldData
            ? {
                data: [...oldData.data, optimisticSubject],
                meta: {
                  ...oldData.meta,
                  total: oldData.meta.total + 1,
                  pageCount: Math.ceil(
                    (oldData.meta.total + 1) / oldData.meta.pageSize
                  ),
                },
              }
            : {
                data: [optimisticSubject],
                meta: {
                  total: 1,
                  page: 1,
                  pageSize: 10,
                  pageCount: 1,
                },
              }
        );
      });

      return { previousData };
    },

    onSuccess: (savedSubject: Subject) => {
      const queries = queryClient.getQueriesData<{
        data: Subject[];
        meta: Meta;
      }>({
        queryKey: ["subjects"],
      });

      queries.forEach(([queryKey, oldData]) => {
        queryClient.setQueryData<{ data: Subject[]; meta: Meta }>(
          queryKey,
          oldData
            ? {
                data: [
                  ...oldData.data.filter(
                    (subject) => !subject.id.startsWith("temp-")
                  ),
                  savedSubject,
                ],
                meta: oldData.meta,
              }
            : {
                data: [savedSubject],
                meta: {
                  total: 1,
                  page: 1,
                  pageSize: 10,
                  pageCount: 1,
                },
              }
        );
      });

      toast({
        description: "Subject created.",
      });
    },

    onError: (error, newSubject, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, oldData]) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }

      toast({
        variant: "destructive",
        description: "Failed to create subject. Please try again.",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
  });
}
