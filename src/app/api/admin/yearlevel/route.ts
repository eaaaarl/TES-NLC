import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    /* const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized!",
        },
        {
          status: 401,
        }
      );
    } */

    const yearlevel = await prisma.yearLevel.findMany({
      select: {
        id: true,
        yearName: true,
      },
      orderBy: {
        yearName: "asc",
      },
    });

    return NextResponse.json(yearlevel);
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
