import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { lucia } from "@/auth";
import { signUpSchema } from "@/lib/validation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Parse and validate request payload
        const requestPayload = await req.json();
        const { email, password, adminID, fullname, avatarUrl } = signUpSchema.parse(requestPayload);

        const defaultRole = "ADMINISTRATOR";

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({
                success: false,
                error: "User already exists."
            }, { status: 409 });
        }

        // Create the user
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                Role: defaultRole
            }
        });

        const newAdministrator = await prisma.administrator.create({
            data: {
                userId: newUser.id,
                adminID,
                fullname,
                avatarUrl
            }
        })

        // Generate a user ID and create a session
        const userId = newUser.id; // Use the ID of the newly created user
        const session = await lucia.createSession(userId, {});


        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        // Return success response
        return NextResponse.json({
            success: true,
            message: 'User created successfully.',
            data: { user: newUser, administrator: newAdministrator }
        }, { status: 201 });

    } catch (error) {
        // Log the entire error object for debugging
        console.error("Unexpected error in signUp function:", error);
        return NextResponse.json({
            success: false,
            error: "An unexpected error occurred. Please try again."
        }, { status: 500 });
    }
}

