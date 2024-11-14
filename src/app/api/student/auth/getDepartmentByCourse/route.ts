import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required!" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
      where: {
        id: String(courseId),
      },
      include: {
        department: true,
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found!" }, { status: 404 });
    }

    return NextResponse.json({ department: course.department });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
