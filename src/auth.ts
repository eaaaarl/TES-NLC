import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./lib/prisma";
import { Lucia, Session, User } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";
import cron from "node-cron";

const adapter = new PrismaAdapter(
  prisma.session, // Session model
  prisma.user // User model
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      Role: attributes.Role,
      studentID: attributes.studentID,
    };
  },
});

// Extend the Lucia type definitions
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  email: string;
  Role: string;
  studentID: string;
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }
    const result = await lucia.validateSession(sessionId);
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch (error) {
      console.error("Error setting session cookie:", error);
    }
    return result;
  }
);

const deleteExpiredSessions = async () => {
  try {
    await lucia.deleteExpiredSessions();
    console.log("Expired sessions deleted successfully.");
  } catch (error) {
    console.error("Error deleting expired sessions:", error);
  }
};

// Schedule the cleanup job
cron.schedule("0 0 * * 0", () => {
  console.log("Running cleanup of expired sessions...");
  deleteExpiredSessions();
});
