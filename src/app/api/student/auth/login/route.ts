import prisma from "@/lib/prisma";
import { studentLoginSchema } from "@/lib/validation";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { lucia } from "@/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        const { studentID, password } = studentLoginSchema.parse(payload);

        const existingUser = await prisma.user.findUnique({
            where: {
                studentID
            }
        })

        if (!existingUser) {
            return Response.json({
                error: 'Student not registered.'
            })
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            return Response.json({
                success: false,
                error: "Invalid Student ID or Password"
            });
        }
        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return Response.json({ success: true });
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}