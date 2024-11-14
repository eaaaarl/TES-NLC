import { Students } from "@/lib/types";
import { StudentEditValues } from "@/lib/validation";

export async function getStudentById(id: string): Promise<Students> {
  const response = await fetch(`/api/admin/students/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch students by thier id");
  }

  return await response.json();
}

export async function updateStudent(id: string, values: StudentEditValues) {
  const response = await fetch(`/api/admin/students/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to update student.");
  }

  return await response.json();
}
