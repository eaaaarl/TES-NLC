import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudent } from "./action";
import { StudentEditValues } from "@/lib/validation";

interface UpdateStudentMutationVariables {
  id: string;
  values: StudentEditValues;
}

// Define a type that represents the data shown in the table
interface StudentTableView {
  id: string;
  studentID: string;
  firstname: string;
  middlename: string;
  lastname: string;
  yearLevel: string;
  department: string;
  section: string;
  status: string;
}

export function useUpdateStudent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: UpdateStudentMutationVariables) =>
      updateStudent(id, values),
    onSuccess: async ({ id, values }) => {
      await queryClient.cancelQueries({ queryKey: ["students"] });
      const previousStudents = queryClient.getQueryData<StudentTableView[]>([
        "students",
      ]);

      queryClient.setQueryData<StudentTableView[]>(["students"], (old) => {
        if (!old) return old;
        return old.map((student) => {
          if (student.id === id) {
            return {
              ...student,
              studentID: values.studentID || student.studentID,
              firstname: values.firstname || student.firstname,
              middlename: values.middlename || student.middlename,
              lastname: values.lastname || student.lastname,
              yearLevel: student.yearLevel,
              department: student.department,
              section: student.section,
              status: student.status,
            };
          }
          return student;
        });
      });

      return { previousStudents };
    },
    onError: (err) => {
      /*  if (context?.previousStudents) {
        queryClient.setQueryData<StudentTableView[]>(
          ["students"],
          context.previousStudents
        );
      } */
      toast({
        title: "Update Failed",
        description:
          err.message || "An error occurred while updating the student.",
        variant: "destructive",
      });
    },
    /*  onSuccess: (updatedStudent, { id }) => {
      queryClient.setQueryData<StudentTableView[]>(["students"], (old) => {
        if (!old) return old;
        return old.map((student) =>
          student.id === id
            ? {
                id: updatedStudent.id,
                studentID: updatedStudent.studentID,
                firstname: updatedStudent.firstname,
                middlename: updatedStudent.middlename,
                lastname: updatedStudent.lastname,
                yearLevel: updatedStudent.yearLevel,
                department: updatedStudent.department,
                section: updatedStudent.section,
                status: updatedStudent.status,
              }
            : student
        );
      });

    }, */
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}
