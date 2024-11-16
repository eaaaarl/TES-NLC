import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { StudentAssignSectionYearLevelSubject } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unathorized",
        },
        {
          status: 403,
        }
      );
    }

    const payload = await req.json();
    const { yearLevelId, sectionId, subjectIds } =
      StudentAssignSectionYearLevelSubject.parse(payload);

    const student = await prisma.student.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!student) {
      return NextResponse.json(
        {
          error: "Student is not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.student.update({
        where: {
          userId: user.id,
        },
        data: {
          sectionId,
          yearLevelId,
        },
      });

      await tx.studentSubjectAssign.deleteMany({
        where: { studentId: student.id },
      });

      await tx.studentSubjectAssign.createMany({
        data: subjectIds.map((s) => ({
          studentId: student.id,
          subjectId: s.id,
        })),
      });
    });

    return NextResponse.json({ success: true });
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
