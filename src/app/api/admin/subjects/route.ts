import prisma from "@/lib/prisma";
import { subjectSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest): Promise<NextResponse> {

    const payload = await req.json();
    const { subjectName } = subjectSchema.parse(payload);

    const newSubject = await prisma.subject.create({
        data: {
            subjectName
        }
    })

    return NextResponse.json({
        success: true,
        data: newSubject
    })
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
        const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') || '5', 10);
        const search = req.nextUrl.searchParams.get('search') || '';

        const offset = (page - 1) * pageSize;

        const total = await prisma.subject.count({
            where: {
                subjectName: {
                    contains: search,
                }
            }
        })

        const subject = await prisma.subject.findMany({
            where: {
                subjectName: {
                    contains: search
                }
            },
            skip: offset,
            take: pageSize,
            orderBy: {
                subjectName: 'desc'
            }
        })

        return NextResponse.json({
            success: true,
            data: subject,
            meta: {
                total,
                page,
                pageSize,
                pageCount: Math.ceil(total / pageSize)
            }
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}