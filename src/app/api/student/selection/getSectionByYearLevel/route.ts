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

    if (!yearLevelId) {
      return NextResponse.json(
        {
          error: "yearLevelId is not found, or required",
        },
        { status: 400 }
      );
    }

    const selectedSection = await prisma.section.findMany({
      where: {
        yearLevelId,
      },
    });

    return NextResponse.json({ data: selectedSection });
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
