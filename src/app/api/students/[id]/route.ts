import prisma from "@/lib/prisma";
import { userSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json(
                { error: "Student ID is required" },
                { status: 400 }
            );
        }

        const student = await prisma.student.findUnique({
            where: { id: id },
        });

        if (!student) {
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: student
        });
    } catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json(
                { error: "Student ID is required" },
                { status: 400 }
            );
        }

        // Parse and validate the request payload
        const payload = await req.json();
        const { fullname, status, studentID } = userSchema.parse(payload);

        // Check if the student exists
        const existingStudent = await prisma.student.findUnique({
            where: { id },
        });

        if (!existingStudent) {
            return NextResponse.json(
                { error: "Student not found!" },
                { status: 404 }
            );
        }

        const updatedStudent = await prisma.student.update({
            where: { id },
            data: {
                studentID,
                fullname,
                status,
            },
        });

        return NextResponse.json({
            success: true,
            data: updatedStudent
        });
    } catch (error) {
        console.error("Error updating student:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}