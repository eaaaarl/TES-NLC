import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({
        error: "Unauthorized!",
      });
    }

    const student = await prisma.student.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
      },
    });

    if (!student) {
      return NextResponse.json({
        error: "Student not found!",
      });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
