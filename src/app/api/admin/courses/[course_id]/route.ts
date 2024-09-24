/* eslint-disable no-unused-vars */
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { courseSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    course_id: string
}

export async function DELETE(req: Request, { params }: { params: Params }) {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized',
            }, { status: 401 });
        }

        const id = params.course_id;
        if (!id) {
            return NextResponse.json(
                { error: "Course ID is required" },
                { status: 400 }
            );
        }

        const existingCourse = await prisma.course.findFirst({
            where: { course_id: id }
        });

        if (!existingCourse) {
            return NextResponse.json(
                { error: "No Course found with the provided ID" },
                { status: 404 }
            );
        }

        const course = await prisma.course.delete({
            where: { course_id: id }
        });

        return NextResponse.json({
            course,
            success: true
        });
    } catch (error) {
        console.error("Error deleting course:", error);

        if (error instanceof Error) {
            return NextResponse.json(
                { error: `Error deleting Course: ${error.message}` },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                { error: 'An unexpected error occurred while deleting the course' },
                { status: 500 }
            );
        }
    }
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized',
            }, { status: 401 });
        }
        const id = params.course_id;
        if (!id) {
            return NextResponse.json(
                { error: "Course ID is required" },
                { status: 400 }
            );
        }
        const requestPayload = await req.json();
        const { courseName } = courseSchema.parse(requestPayload);

        const existingCourse = await prisma.course.findUnique({
            where: { course_id: id }
        })

        if (!existingCourse) {
            return NextResponse.json(
                { error: "Course ID is not found!" },
                { status: 400 }
            );
        }

        const updatedCourse = await prisma.course.update({
            where: {
                course_id: id
            },
            data: {
                courseName
            }
        })

        return NextResponse.json({
            success: true,
            data: updatedCourse
        });
    } catch (error) {
        console.error("Error updating course:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}