import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 304 }
      );
    }

    const userID = params.id;
    if (!userID) {
      return NextResponse.json(
        {
          error: "Id is required",
        },
        {
          status: 401,
        }
      );
    }

    const existingStudent = await prisma.student.findUnique({
      where: {
        id: userID,
      },
      include: {
        user: true,
      },
    });

    if (!existingStudent) {
      return NextResponse.json(
        {
          error: "No student found with the provider ID",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.student.delete({
        where: { id: userID },
      });

      if (existingStudent.user) {
        await tx.user.delete({
          where: { id: existingStudent.user.id },
        });
      }
    });

    return NextResponse.json({
      success: true,
      message: "Student and associated user deleted successfully.",
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
