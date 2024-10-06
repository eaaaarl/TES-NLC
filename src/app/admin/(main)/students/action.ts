import { Students } from "@/lib/types";
import ky from "ky";

export interface FetchResponse {
  data: Students[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export async function fetchStudent(
  page: number,
  pageSize: number,
  search: string
): Promise<FetchResponse> {
  const response = await ky
    .get(`/api/admin/students`, {
      searchParams: {
        page: String(page),
        pageSize: String(pageSize),
        search: search || "",
      },
    })
    .json<FetchResponse>();

  if (!response) {
    throw new Error("Failed to fetch the students!");
  }

  return response;
}

export async function deleteStudent(id: string) {
  const response = await ky.delete(`/api/admin/students/${id}`).json();
  if (!response) {
    throw new Error("Failed to delete students!");
  }
  console.log(response);
  return response;
}
