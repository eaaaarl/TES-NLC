import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { StudentEditSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const id = params.id;
    if (!id) {
      return NextResponse.json(
        {
          error: "Id is required!",
        },
        {
          status: 404,
        }
      );
    }
    const payload = await req.json();
    const {
      studentID,
      firstname,
      middlename,
      lastname,
      courseId,
      departmentId,
      gender,
    } = StudentEditSchema.parse(payload);

    const existingStudent = await prisma.student.findUnique({
      where: {
        id,
      },
    });
    if (!existingStudent) {
      return NextResponse.json(
        {
          error: "No Student is Found provider ID",
        },
        {
          status: 401,
        }
      );
    }

    const updatedStudent = await prisma.student.update({
      where: {
        id,
      },
      data: {
        studentID,
        firstname,
        middlename,
        lastname,
        courseID: courseId,
        departmentId,
        gender,
      },
    });

    return NextResponse.json(updatedStudent);
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
