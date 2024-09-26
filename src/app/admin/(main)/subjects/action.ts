import { SubjectValues } from "@/lib/validation";


export async function fetchSubject(page: number, pageSize: number, search: string) {
    const response = await fetch(`/api/admin/subjects?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search).replace("%20", '+')}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error("Failed to reach the server. Please check your network or try again later.");
    }

    return data;
}

export async function createSubject(values: SubjectValues) {
    const response = await fetch(`/api/admin/subjects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error("Failed to reach the server. Please check your network or try again later.");
    }
    return data;
}

export async function deleteSubject(subject_id: string) {
    const response = await fetch(`/api/admin/subjects/${subject_id}`, {
        method: 'DELETE'
    })
    const data = await response.json();

    if (!response.ok) {
        throw new Error("Failed to reach the server. Please check your network or try again later.");
    }
    return data;
}

export async function updateSubject(subject_id: string, values: SubjectValues) {
    const response = await fetch(`/api/admin/subjects/${subject_id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error("Failed to reach the server. Please check your network or try again later.");
    }
    return data;
}   