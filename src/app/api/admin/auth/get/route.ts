/* eslint-disable @typescript-eslint/no-unused-vars */

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const { user } = await validateRequest();
    if (!user) {
        return NextResponse.json({
            message: 'Unauthorized!'
        });
    }

    const admin = await prisma.administrator.findUnique({
        where: { userId: user.id },
        include: { user: true }
    })

    if (!admin) {
        return NextResponse.json({
            message: 'Administrator not found!'
        });
    }

    return NextResponse.json({
        adminID: admin.adminID,
        fullname: admin.fullname,
        email: admin.user.email,
        avatarUrl: admin.avatarUrl
    })
}