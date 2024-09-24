import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { lucia } from "@/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const requestPayload = await req.json();

        const { email, password } = loginSchema.parse(requestPayload);

        const existingUser = await prisma.user.findFirst({
            where: { email }
        });

        if (!existingUser || !existingUser.password) {
            return NextResponse.json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            return NextResponse.json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return NextResponse.json({
            success: true,
            message: "Authenticated Successfully."
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: "Something went wrong. Please try again.",
        });
    }
}