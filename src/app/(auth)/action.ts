"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validation";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function login(
    credentials: LoginValues
): Promise<{ success: boolean; error?: string }> {
    try {
        const { email, password } = loginSchema.parse(credentials);

        const existingUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!existingUser || !existingUser.passwordHash) {
            return {
                success: false,
                error: "Incorrect username or password"
            }
        }

        const validPassword = await bcrypt.compare(password, existingUser.passwordHash);
        if (!validPassword) {
            return {
                success: false,
                error: "Incorrect username or password",
            };
        }

        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return { success: true };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Something went wrong. Please try again.",
        };
    }
}