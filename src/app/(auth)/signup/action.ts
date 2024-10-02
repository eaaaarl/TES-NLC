import { StudentValues } from "@/lib/validation";

export async function signUpStudent(payload: StudentValues) {

    const response = await fetch(`/api/student/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
        return {
            success: false,
            data
        }
    }
    return {
        success: true,
        data
    };
}
