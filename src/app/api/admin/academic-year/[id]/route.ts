import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { AcademicYearSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextResponse,
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
          error: "Academic Year is required!",
        },
        {
          status: 404,
        }
      );
    }

    const payload = await req.json();
    const { year, semester, isActive } = AcademicYearSchema.parse(payload);

    const isActiveBoolean =
      typeof isActive === "string" ? isActive === "true" : isActive;

    const updatedAcademicYear = await prisma.academicYear.update({
      where: {
        id,
      },
      data: {
        year,
        semester,
        isActive: isActiveBoolean,
      },
    });
    return NextResponse.json(updatedAcademicYear);
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

export async function DELETE(
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
          error: "Academic Year ID is required!",
        },
        {
          status: 404,
        }
      );
    }

    const existingAcademicYear = await prisma.academicYear.findFirst({
      where: {
        id,
      },
    });

    if (!existingAcademicYear) {
      return NextResponse.json(
        {
          error: "Academic Year ID is not found.",
        },
        {
          status: 404,
        }
      );
    }

    const deletedAcademicYear = await prisma.academicYear.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedAcademicYear);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
