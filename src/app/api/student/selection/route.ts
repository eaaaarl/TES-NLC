import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get student data with their current selections
    const student = await prisma.student.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        section: {
          include: {
            yearLevel: true,
            Department: true,
          },
        },
        StudentSubjectAssign: {
          include: {
            subject: true,
          },
        },
        department: true,
        course: true,
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const needsSelection =
      !student.section || student.StudentSubjectAssign.length === 0;

    let selectionData = null;

    const academicYear = await prisma.academicYear.findFirst({
      where: {
        isActive: true,
      },
      select: {
        year: true,
        semester: true,
      },
    });

    if (needsSelection) {
      selectionData = await prisma.$transaction(async (tx) => {
        const departments = await tx.department.findMany({
          select: {
            id: true,
            departmentName: true,
          },
        });

        const yearLevels = await tx.yearLevel.findMany({
          select: {
            id: true,
            yearName: true,
          },
        });

        const sections = await tx.section.findMany({
          select: {
            id: true,
            sectionName: true,
            yearLevelId: true,
            departmentId: true,
          },
        });

        const subjects = await tx.subject.findMany({
          select: {
            id: true,
            subject_code: true,
            subjectName: true,
          },
        });

        const courses = await tx.course.findMany({
          select: {
            id: true,
            courseName: true,
            departmentId: true,
          },
        });

        return {
          departments,
          yearLevels,
          sections,
          subjects,
          courses,
        };
      });
    }

    return NextResponse.json({
      student: {
        id: student.id,
        currentSelections: {
          department: student.department,
          course: student.course,
          section: student.section,
          subjects: student.StudentSubjectAssign.map(
            (assign) => assign.subject
          ),
        },
        needsSelection,
      },
      selectionData,
      academicYear,
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
