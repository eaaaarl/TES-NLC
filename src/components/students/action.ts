import { ChangePasswordValues } from "@/lib/validation";
import ky from "ky";

export async function changePassword(
  id: string,
  payload: ChangePasswordValues
): Promise<{ success: boolean; error: string }> {
  const response = await ky.put(`/api/student/auth/${id}/change-password`, {
    json: payload,
  });

  if (!response.ok) {
    throw new Error("Failed to change the password, please try again");
  }

  return response.json();
}
