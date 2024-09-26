import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { courseSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {


        const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
        const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') || '5');
        const search = req.nextUrl.searchParams.get('search') || '';
        const skip = (page - 1) * pageSize;

        const [data, total] = await Promise.all([
            prisma.course.findMany({
                where: {
                    courseName: {
                        contains: search,
                    }
                },
                orderBy: { course_id: 'desc' },
                skip,
                take: pageSize
            }),
            prisma.course.count({
                where: {
                    courseName: {
                        contains: search,
                    }
                },
            })
        ]);

        return NextResponse.json({
            data,
            meta: {
                total,
                page,
                pageSize,
                pageCount: Math.ceil(total / pageSize)
            }
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
    }
}


export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized',
            }, { status: 401 });
        }

        const requestPayload = await req.json();
        const { courseName } = courseSchema.parse(requestPayload);

        const newCourse = await prisma.course.create({
            data: {
                courseName
            }
        })

        return NextResponse.json({
            success: true,
            message: "New Course Added!",
            data: newCourse
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error Adding Course",
        })
    }
}