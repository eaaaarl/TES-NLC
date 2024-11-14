import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
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

    const sectionId = req.nextUrl.searchParams.get("sectionId") || null;
    if (!sectionId) {
      return NextResponse.json(
        {
          error: "Section Id is required",
        },
        { status: 401 }
      );
    }

    const existingSection = await prisma.section.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!existingSection) {
      return NextResponse.json(
        {
          error: "Section Id is not found",
        },
        { status: 404 }
      );
    }

    const deletedSection = await prisma.section.delete({
      where: {
        id: sectionId,
      },
    });

    return NextResponse.json(deletedSection);
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
