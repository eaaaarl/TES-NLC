import { categoryValues, questionValues } from "@/lib/validation";

export async function createCategory(payload: categoryValues) {
  const response = await fetch(`/api/admin/category`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create a category");
  }

  return response.json();
}

export async function updateCategory(payload: categoryValues, id: string) {
  const response = await fetch(`/api/admin/category/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return response.json();
}

export async function createQuestion(payload: questionValues) {
  const response = await fetch(`/api/admin/question`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create question");
  }

  return response.json();
}
