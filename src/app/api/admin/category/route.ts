import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { CategorySchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

    const data = await prisma.category.findMany();
    return NextResponse.json({ data });
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

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 403,
        }
      );
    }

    const payload = await req.json();
    const { categoryName } = CategorySchema.parse(payload);

    const newCategory = await prisma.category.create({
      data: {
        name: categoryName,
      },
    });

    return NextResponse.json(newCategory);
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
