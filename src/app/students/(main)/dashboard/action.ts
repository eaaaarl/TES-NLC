import { studentAssignSectionYearLevelSubjectValues } from "@/lib/validation";

export async function submitSelection(
  payload: studentAssignSectionYearLevelSubjectValues
) {
  const response = await fetch(`/api/student/submit-selection`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to submit a selection");
  }

  return response.json();
}
