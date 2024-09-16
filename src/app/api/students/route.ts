import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
        const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') || '5');
        const search = req.nextUrl.searchParams.get('search') || '';
        const skip = (page - 1) * pageSize;

        const students = await prisma.student.findMany({
            where: {
                fullname: {
                    contains: search,
                    /*  mode: 'insensitive', */ // Case-insensitive search
                }
            },
            skip,
            take: pageSize,
            orderBy: { id: 'desc' }
        });

        const totalStudents = await prisma.student.count({
            where: {
                fullname: {
                    contains: search,
                    /*  mode: 'insensitive', */
                }
            }
        });

        const data = {
            students,
            currentPage: page,
            totalPages: Math.ceil(totalStudents / pageSize),
        };
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
