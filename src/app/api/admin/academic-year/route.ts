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
      return NextResponse.json(
        {
          error: "Unathorized!",
        },
        {
          status: 403,
        }
      );
    }

    const payload = await req.json();
    const { year, semester } = AcademicYearSchema.parse(payload);

    const newAcademicYear = await prisma.academicYear.create({
      data: {
        year,
        semester,
        isActive: true,
      },
    });

    return NextResponse.json(newAcademicYear);
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
