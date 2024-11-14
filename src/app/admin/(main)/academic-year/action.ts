import { AcademicYear } from "@/lib/types";
import { academicYearValues } from "@/lib/validation";

export async function createAcademicYear(payload: academicYearValues) {
  const response = await fetch(`/api/admin/academic-year`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create academic year");
  }

  return response.json;
}

export async function fetchAcademicYear(
  page: number,
  pageSize: number,
  search: string
): Promise<{
  data: AcademicYear[];
  meta: { pageCount: number; total: number };
}> {
  const response = await fetch(
    `/api/admin/academic-year?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(
      search
    ).replace("/20%g/", "+")}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch the academic year");
  }

  return response.json();
}

export async function updateAcademicYear(
  payload: academicYearValues,
  id: string
) {
  const response = await fetch(`/api/admin/academic-year/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update academic year");
  }
  return response.json();
}

export async function deleteAcademicYear(id: string) {
  const response = await fetch(`/api/admin/academic-year/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete the academic year");
  }

  return response.json();
}
