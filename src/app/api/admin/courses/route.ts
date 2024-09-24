import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { courseSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

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