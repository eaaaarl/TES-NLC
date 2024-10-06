import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { ChangePasswordSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(
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
        { status: 401 }
      );
    }

    const id = params.id;
    const payload = await req.json();
    const { currentPassword, newPassword } =
      ChangePasswordSchema.parse(payload);
    if (!id) {
      return NextResponse.json(
        {
          error: "Id is not found",
        },
        { status: 404 }
      );
    }

    const existingStudent = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingStudent) {
      return NextResponse.json(
        {
          error: "The provider ID of the student is not found!",
        },
        {
          status: 404,
        }
      );
    }
    const validPassword = await bcrypt.compare(
      currentPassword,
      existingStudent?.password
    );
    if (!validPassword) {
      return NextResponse.json({
        success: false,
        error: "Current Password Incorrect",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);

    const student = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashPassword,
      },
    });

    return NextResponse.json({
      success: true,
      student,
    });
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
