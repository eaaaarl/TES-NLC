import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const courses = await prisma.course.findMany({
            select: {
                course_id: true,
                courseName: true,
            },
        });

        return Response.json(courses);
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}