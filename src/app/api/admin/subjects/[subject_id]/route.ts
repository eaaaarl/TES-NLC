import prisma from "@/lib/prisma";
import { subjectSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { subject_id: string } }) {
    try {
        const subject_id = params.subject_id;

        const existingSubject = await prisma.subject.findFirst({
            where: {
                subject_id
            }
        })

        if (!existingSubject) {
            return NextResponse.json({
                error: 'No Subject found with the provided ID'
            })
        }

        const subject = await prisma.subject.delete({
            where: {
                subject_id
            }
        })

        return NextResponse.json(subject);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { subject_id: string } }) {
    try {
        const subject_id = params.subject_id;
        const payload = await req.json();
        const { subjectName } = subjectSchema.parse(payload);

        if (!subject_id) {
            return NextResponse.json({
                error: 'Subject_id is required!'
            })
        }

        const existingSubject = await prisma.subject.findUnique({
            where: { subject_id }
        })

        if (!existingSubject) {
            return NextResponse.json({
                error: 'Subject_id is not found!'
            })
        }

        const updateSubject = await prisma.subject.update({
            where: {
                subject_id
            },
            data: {
                subjectName
            }
        })

        return NextResponse.json(updateSubject);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}