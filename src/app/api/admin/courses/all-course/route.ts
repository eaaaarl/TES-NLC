import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"; // Import NextResponse

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        courseName: true,
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
