import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { AcademicYearSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 403 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "Academic Year ID is required!" },
        { status: 404 }
      );
    }

    const payload = await req.json();
    const { year, semester, isActive } = AcademicYearSchema.parse(payload);
    const isActiveBoolean =
      typeof isActive === "string" ? isActive === "true" : isActive;

    // Validate academic year exists
    const existingYear = await prisma.academicYear.findUnique({
      where: { id },
    });

    if (!existingYear) {
      return NextResponse.json(
        { error: "Academic year not found" },
        { status: 404 }
      );
    }

    // Split into two transactions to prevent timeout
    const updatedYear = await prisma.$transaction(async (tx) => {
      // Only deactivate others if this one is being activated
      if (isActiveBoolean) {
        await tx.academicYear.updateMany({
          where: { isActive: true },
          data: { isActive: false },
        });
      }

      return await tx.academicYear.update({
        where: { id },
        data: {
          year,
          semester,
          isActive: isActiveBoolean,
        },
      });
    });

    // Only perform reset operations if academic year is being activated
    if (isActiveBoolean) {
      await prisma.$transaction(async (tx) => {
        await Promise.all([
          tx.student.updateMany({
            where: {},
            data: {
              status: "PENDING",
              sectionId: null,
              yearLevelId: null,
            },
          }),
          tx.studentSubjectAssign.deleteMany({}),
          tx.evaluation.deleteMany({
            where: { status: "PENDING" },
          }),
        ]);
      });
    }

    return NextResponse.json({
      message: "Academic year updated successfully.",
      data: updatedYear,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 403 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "Academic Year ID is required!" },
        { status: 404 }
      );
    }

    // Check if academic year exists and is active
    const existingYear = await prisma.academicYear.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            StudentSubjectAssign: true,
            Evaluation: true,
          },
        },
      },
    });

    if (!existingYear) {
      return NextResponse.json(
        { error: "Academic Year not found." },
        { status: 404 }
      );
    }

    if (existingYear.isActive) {
      return NextResponse.json(
        { error: "Cannot delete active academic year." },
        { status: 400 }
      );
    }

    // Check if academic year has associated data
    if (
      existingYear._count.StudentSubjectAssign > 0 ||
      existingYear._count.Evaluation > 0
    ) {
      // Instead of deleting, archive the academic year
      const archivedYear = await prisma.academicYear.update({
        where: { id },
        data: {
          status: "ARCHIVED",
          isActive: false,
        },
      });

      return NextResponse.json({
        message: "Academic year archived due to existing references.",
        data: archivedYear,
      });
    }

    // If no associated data, proceed with deletion
    const deletedYear = await prisma.academicYear.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Academic year deleted successfully.",
      data: deletedYear,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
