import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { sectionSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized!",
        },
        { status: 403 }
      );
    }
    const sectionId = req.nextUrl.searchParams.get("sectionId") || null;

    if (!sectionId) {
      return NextResponse.json(
        {
          error: "SectionId is required!",
        },
        { status: 401 }
      );
    }
    const payload = await req.json();
    const { sectionName, yearLevelId, departmentId } =
      sectionSchema.parse(payload);

    const existingSection = await prisma.section.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!existingSection) {
      return NextResponse.json(
        {
          error: "Section Id is not Found!",
        },
        { status: 404 }
      );
    }

    const updatedSection = await prisma.section.update({
      where: {
        id: sectionId,
      },
      data: {
        sectionName,
        yearLevelId,
        departmentId,
      },
    });

    return NextResponse.json(updatedSection);
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
