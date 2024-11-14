import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { sectionSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const pageSize = parseInt(req.nextUrl.searchParams.get("pageSize") || "5");
    const search = req.nextUrl.searchParams.get("search") || "";

    const [data, total] = await Promise.all([
      prisma.section.findMany({
        where: {
          sectionName: {
            contains: search,
          },
        },
        include: {
          yearLevel: true,
          Department: true,
        },
        orderBy: {
          yearLevelId: "desc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.section.count({
        where: {
          sectionName: {
            contains: search,
          },
        },
      }),
    ]);

    return NextResponse.json({
      data,
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
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unathorized!",
        },
        { status: 401 }
      );
    }
    const payload = await req.json();
    const { sectionName, yearLevelId, departmentId } =
      sectionSchema.parse(payload);
    const uniqueSection = await prisma.section.findUnique({
      where: {
        sectionName,
      },
    });

    if (uniqueSection) {
      return NextResponse.json(
        { error: "A section name already exists." },
        { status: 409 }
      );
    }
    const section = await prisma.section.create({
      data: {
        sectionName,
        yearLevelId,
        departmentId,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
