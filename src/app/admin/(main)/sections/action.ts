import { Sections } from "@/lib/types";
import { SectionValues } from "@/lib/validation";
import ky, { HTTPError } from "ky";

export const fetchSection = async (
  page: number,
  pageSize: number,
  search: string
): Promise<{
  data: Sections[];
  meta: { pageCount: number; total: number };
}> => {
  const response = await fetch(
    `/api/admin/sections?page=${page}&pageSize=${pageSize}&search=${search}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch sections");
  }

  return await response.json();
};

export async function createSection(values: SectionValues) {
  try {
    const response = await ky
      .post(`/api/admin/sections`, {
        json: values,
      })
      .json();

    return response;
  } catch (error) {
    if (error instanceof HTTPError && error.response) {
      const errorMessage = await error.response.json();
      throw new Error(errorMessage.error);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

export async function deleteSection(sectionId: string) {
  const response = await fetch(
    `/api/admin/sections/delete?sectionId=${sectionId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.error || "Failed to edit section");
  }

  return await response.json();
}

export async function updateSection(values: SectionValues, sectionId: string) {
  const response = await fetch(
    `/api/admin/sections/edit?sectionId=${sectionId}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.error || "Failed to edit section");
  }
  return await response.json();
}
