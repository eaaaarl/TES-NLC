import prisma from "@/lib/prisma";
import { subjectSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { subject_id: string } }
) {
  try {
    const id = params.subject_id;

    const existingSubject = await prisma.subject.findFirst({
      where: {
        id,
      },
    });

    if (!existingSubject) {
      return NextResponse.json({
        error: "No Subject found with the provided ID",
      });
    }

    const subject = await prisma.subject.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(subject);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { subject_id: string } }
) {
  try {
    const id = params.subject_id;
    const payload = await req.json();
    const { subjectName, subject_code, yearLevelId, departmentId } =
      subjectSchema.parse(payload);

    if (!id) {
      return NextResponse.json(
        {
          error: "Subject_id is required!",
        },
        {
          status: 401,
        }
      );
    }

    const existingSubject = await prisma.subject.findUnique({
      where: { id },
    });

    if (!existingSubject) {
      return NextResponse.json(
        {
          error: "Subject_id is not found!",
        },
        {
          status: 404,
        }
      );
    }

    const updateSubject = await prisma.subject.update({
      where: {
        id,
      },
      data: {
        subjectName,
        subject_code,
        yearLevelId,
        departmentId,
      },
    });

    return NextResponse.json(updateSubject);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
