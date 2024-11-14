import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return Response.json(
        {
          error: "Unauthorized!",
        },
        { status: 403 }
      );
    }

    const student = await prisma.student.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        course: true,
        department: true,
        section: {
          include: {
            yearLevel: true,
          },
        },
      },
    });

    if (!student) {
      return Response.json(
        {
          error: "Student not found!",
        },
        { status: 404 }
      );
    }

    return Response.json(student);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
