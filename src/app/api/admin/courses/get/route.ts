import prisma from "@/lib/prisma";
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
