import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { AcademicYearSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized!",
        },
        {
          status: 403,
        }
      );
    }

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const pageSize = parseInt(req.nextUrl.searchParams.get("pageSize") || "5");
    const search = req.nextUrl.searchParams.get("search") || "";

    const [data, total] = await Promise.all([
      prisma.academicYear.findMany({
        where: {
          year: {
            contains: search,
          },
          semester: {
            contains: search,
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          year: "desc",
        },
      }),

      prisma.academicYear.count({
        where: {
          year: {
            contains: search,
          },
          semester: {
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
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 403 });
    }

    const payload = await req.json();
    const { year, semester } = AcademicYearSchema.parse(payload);

    const existingYear = await prisma.academicYear.findFirst({
      where: { year, semester },
    });

    if (existingYear) {
      return NextResponse.json(
        { error: "Academic year already exists" },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      await tx.academicYear.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });

      const newAcademicYear = await tx.academicYear.create({
        data: {
          year,
          semester,
          isActive: true,
          status: "ACTIVE",
        },
      });

      return newAcademicYear;
    });

    await prisma.$transaction(async (tx) => {
      await tx.student.updateMany({
        where: {},
        data: {
          status: "PENDING",
          sectionId: null,
          yearLevelId: null,
        },
      });

      await Promise.all([
        tx.studentSubjectAssign.deleteMany({}),
        tx.evaluation.deleteMany({
          where: { status: "PENDING" },
        }),
      ]);
    });

    return NextResponse.json({
      message: "Academic year created and system reset successfully.",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
