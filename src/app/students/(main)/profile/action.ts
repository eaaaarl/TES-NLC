export async function getStudent() {
  const response = await fetch(`/api/student/auth/profile`);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return await response.json();
}
