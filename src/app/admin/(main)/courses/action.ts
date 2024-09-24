
import { CourseValues } from "@/lib/validation";

export async function createCourse(values: CourseValues) {
    try {
        const response = await fetch("/api/admin/courses", {
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
        console.error("Error in Creating course:", error);
        return {
            success: false,
            error: "An unexpected error occurred.",
        };
    }
}

export const fetchCourses = async (page: number, pageSize: number, search: string) => {
    const response = await fetch(
        `/api/admin/courses/get?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search).replace('/20%g/', '+')}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch courses");
    }
    return response.json();
};

export const deleteCourse = async (id: string) => {
    try {
        const response = await fetch(`/api/admin/courses/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();
        console.log(data);
        return { data };
    } catch (error) {
        console.error(error);
        return {
            error: 'Something went wrong!'
        }
    }

}

export const updateCourse = async (id: string, values: CourseValues) => {
    try {
        const response = await fetch(`/api/admin/courses/${id}`, {
            method: "PUT",
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
        console.error("Error in updating course:", error);
        return {
            success: false,
            error: "An unexpected error occurred.",
        };
    }
}
