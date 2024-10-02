import prisma from "@/lib/prisma";
import { studentSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { lucia } from "@/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const payload = await req.json();
        const {
            firstname,
            middlename,
            lastname,
            studentID,
            gender,
            yearlevel,
            degreeProgram,
            email,
            contact_no,
            birthdate,
            streetAddress,
            barangay,
            city,
            state_province,
            postal_code,
            password,
            avatarUrl,
            status } = studentSchema.parse(payload);

        const existingStudent = await prisma.student.findUnique({
            where: { studentID }
        })

        if (existingStudent) {
            return NextResponse.json({
                error: "Student ID already exists"
            }, { status: 409 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({
                error: "User with this email already exists"
            }, { status: 409 });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                studentID,
                password: hashPassword,
                Role: 'STUDENT'
            }
        })

        const newStudent = await prisma.student.create({
            data: {
                email,
                studentID,
                firstname,
                middlename,
                lastname,
                gender,
                yearlevel,
                contact_no,
                birthdate,
                streetAddress,
                barangay,
                city,
                state_province,
                postal_code,
                avatarUrl,
                status,
                courseID: degreeProgram,
                userId: newUser.id,
            }
        })

        const userId = newUser.id;
        const session = await lucia.createSession(userId, {});

        const sessionCookie = await lucia.createSessionCookie(session.id);

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        )

        return NextResponse.json({
            success: true,
            student: newStudent
        }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error", success: false }, { status: 500 })
    }
}