import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { QuestionSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

    const getQuestion = await prisma.question.findMany({
      include: {
        ratingScale: true,
        category: true,
      },
    });

    return NextResponse.json({ data: getQuestion });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unathorized",
        },
        { status: 403 }
      );
    }
    const payload = await req.json();
    const {
      categoryName,
      question,
      description,
      required,
      allowComments,
      ratingScale,
    } = QuestionSchema.parse(payload);

    const createdQuestion = await prisma.question.create({
      data: {
        categoryId: categoryName,
        question,
        description,
        required,
        allowComments,
        ratingScale: {
          create: ratingScale.map(({ rating, description }) => ({
            rating,
            description,
          })),
        },
      },
    });

    return NextResponse.json(createdQuestion);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
