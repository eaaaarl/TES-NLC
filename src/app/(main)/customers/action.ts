"use server"
import prisma from "@/lib/prisma";

export async function DeleteStudent(id: string): Promise<{ success: boolean; error?: string; }> {
    try {
        const existingStudent = await prisma.student.findFirst({
            where: { id }
        })

        if (!existingStudent) {
            throw new Error("No Students Found!");
        }

        await prisma.student.delete({
            where: { id },
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to delete student:', error);
        return { success: false, error: 'Failed to delete student' };
    }
}