import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Student {
    id: string;
    studentID: string;
    fullname: string;
    status: string;
}

interface UpdateStudentPayload {
    studentID: string;
    fullname: string;
    status: string;
}

interface UpdateStudentVariables {
    id: string;
    payload: UpdateStudentPayload;
}

async function updateStudent(id: string, payload: UpdateStudentPayload): Promise<Student> {
    const response = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Update failed');
    }

    const data = await response.json();
    return data.data;
}

export function useUpdateStudent() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation<Student, Error, UpdateStudentVariables>({
        mutationFn: ({ id, payload }) => updateStudent(id, payload),
        onSuccess: (updatedStudent, variables) => {
            queryClient.setQueryData(['student', variables.id], updatedStudent);
            toast({
                description: "Student updated successfully",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                description: `Error updating student: ${error.message}`,
            });
        },
        onSettled: (_, __, variables) => {
            queryClient.invalidateQueries({ queryKey: ['student', variables.id] });
        },
    });
}