import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
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
          status: 403,
        }
      );
    }

    const yearLevelId = req.nextUrl.searchParams.get("yearLevelId") || "";
    const departmentId = req.nextUrl.searchParams.get("departmentId") || "";

    if (!yearLevelId && !departmentId) {
      return NextResponse.json(
        {
          error:
            "yearLevelId is not found and departmentId is not found, or required",
        },
        {
          status: 400,
        }
      );
    }

    const selectedSubject = await prisma.subject.findMany({
      where: {
        yearLevelId,
        departmentId,
      },
    });

    return NextResponse.json({ data: selectedSubject });
  } catch (error) {
    console.log(error);
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
