import { LoginValues } from "@/lib/validation";

export async function login(values: LoginValues) {
    try {
        const response = await fetch(`/api/admin/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        if (!data.ok) {
            return {
                ...data,
            };
        }
        return { ...data };
    } catch (error) {
        console.error("Error in signUp:", error);
        return {
            success: false,
            error: "An unexpected error occurred.",
        };
    }
}