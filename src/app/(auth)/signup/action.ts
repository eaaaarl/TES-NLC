"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import bcrypt from "bcrypt";
import { generateId } from "lucia";
import { cookies } from "next/headers";

export async function signUp(
    credentials: SignUpValues
): Promise<{ success: boolean; error?: string }> {
    try {
        // Validate input
        const { username, email, password } = signUpSchema.parse(credentials);

        // Check for existing email
        const existingEmail = await prisma.user.findUnique({
            where: { email },
        });

        if (existingEmail) {
            console.log(`Signup attempt with existing email: ${email}`);
            return { success: false, error: "Email already taken" };
        }

        // Hash the password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Generate user ID
        const userId = generateId(15);

        // Create new user
        await prisma.user.create({
            data: {
                id: userId,
                username,
                email,
                passwordHash,
            },
        });

        // Create session
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        // Return success
        return { success: true };
    } catch (error) {
        console.error("Unexpected error in signUp function:", error);
        return { success: false, error: "An unexpected error occurred. Please try again." };
    }
}