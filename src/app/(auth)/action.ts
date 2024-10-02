import { StudentLoginValues } from '@/lib/validation';


export async function login(payload: StudentLoginValues) {
    const response = await fetch(`/api/student/auth/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        throw new Error('Something went wrong!')
    }

    return await response.json();
}
