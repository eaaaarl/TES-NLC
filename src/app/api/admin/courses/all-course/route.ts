import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const courses = await prisma.course.findMany({
            select: {
                course_id: true,
                courseName: true,
            },
        });

        // Disable caching in the response headers
        return new Response(JSON.stringify(courses), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store'
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
