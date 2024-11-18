import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({
        error: "Unauthorized!",
      });
    }

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(
      req.nextUrl.searchParams.get("pageSize") || "5",
      10
    );
    const search = req.nextUrl.searchParams.get("search") || "";

    const offset = (page - 1) * pageSize;

    const total = await prisma.student.count({
      where: {
        OR: [
          { studentID: { contains: search } },
          { firstname: { contains: search } },
          { middlename: { contains: search } },
          { lastname: { contains: search } },
        ],
      },
    });

    const students = await prisma.student.findMany({
      where: {
        OR: [
          { studentID: { contains: search } },
          { firstname: { contains: search } },
          { middlename: { contains: search } },
          { lastname: { contains: search } },
        ],
      },
      include: {
        course: {
          include: {
            department: true,
          },
        },
        section: {
          include: {
            yearLevel: true,
          },
        },
        yearLevel: true,
      },
      skip: offset,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: students,
      meta: {
        total,
        page,
        pageSize,
        pageCount: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
