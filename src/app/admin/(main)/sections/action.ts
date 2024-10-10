import { Sections } from "@/lib/types";
import { SectionValues } from "@/lib/validation";
import ky from "ky";

export const fetchSection = async (
  page: number,
  pageSize: number,
  search: string
): Promise<{
  data: Sections[];
  meta: { pageCount: number; total: number };
}> => {
  const response = await ky.get(`/api/admin/sections`, {
    searchParams: {
      page,
      pageSize,
      search: encodeURIComponent(search).replace(/20%g/, "+"),
    },
  });

  if (!response) {
    throw new Error("Failed to fetch sections");
  }
  const result = await response.json();
  return result;
};

export async function createSection(values: SectionValues) {
  const response = await ky
    .post(`/api/admin/sections`, {
      method: "post",
      json: values,
    })
    .json();

  if (!response) {
    throw new Error("failed to create sections");
  }

  return response;
}
