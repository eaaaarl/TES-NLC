import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const yearlevel = req.nextUrl.searchParams.get("yearlevel") || "";
    const department = req.nextUrl.searchParams.get("department") || "";

    if (!yearlevel) {
      return NextResponse.json(
        {
          error: "Year Level ID is not found",
        },
        { status: 404 }
      );
    }
    if (!department) {
      return NextResponse.json(
        {
          error: "Department ID is not found",
        },
        { status: 404 }
      );
    }

    const section = await prisma.section.findMany({
      where: {
        yearLevelId: yearlevel,
        departmentId: department,
      },
    });

    return NextResponse.json(section);
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
