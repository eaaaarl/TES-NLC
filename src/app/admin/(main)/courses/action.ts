import { Course } from "@/lib/types";
import { CourseValues } from "@/lib/validation";

export async function createCourse(values: CourseValues) {
  const response = await fetch("/api/admin/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Someting went Error");
  }

  const data = await response.json();
  return data;
}

export const fetchCourses = async (
  page: number,
  pageSize: number,
  search: string
): Promise<{ data: Course[]; meta: { pageCount: number; total: number } }> => {
  const response = await fetch(
    `/api/admin/courses?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(
      search
    ).replace("/20%g/", "+")}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
};

export const deleteCourse = async (id: string) => {
  try {
    const response = await fetch(`/api/admin/courses/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log(data);
    return { data };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong!",
    };
  }
};

export const updateCourse = async (
  id: string,
  values: CourseValues
): Promise<{ courseName: string; departmentId: string }> => {
  const response = await fetch(`/api/admin/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update course");
  }
  return data;
};
