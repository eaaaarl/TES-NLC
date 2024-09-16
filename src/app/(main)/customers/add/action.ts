"use server"
import prisma from '@/lib/prisma';
import { userSchema } from '@/lib/validation'

export default async function createStudent(input: {
    studentID: string,
    fullname: string,
    status: string
}) {
    const { studentID, fullname, status } = userSchema.parse(input);

    const existingStudent = await prisma.student.findUnique({
        where: { studentID }
    });

    if (existingStudent) {
        throw new Error("Student ID already exists!");
    }

    const newStudent = await prisma.student.create({
        data: {
            studentID,
            fullname,
            status,
        },
    });

    return newStudent;
}
