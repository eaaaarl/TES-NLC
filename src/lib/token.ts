import { generateIdFromEntropySize } from "lucia";
import prisma from "./prisma";

export async function genereateRegistrationToken(
  admin: string,
  role: "FACULTY"
) {
  const token = generateIdFromEntropySize(32);
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const registrationToken = await prisma.registrationToken.create({
    data: {
      token,
      expiresAt,
      role,
      createdBy: admin,
    },
  });

  return registrationToken;
}

export async function validateRegistrationToken(token: string) {
  const registrationToken = await prisma.registrationToken.findUnique({
    where: {
      token,
      used: false,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  return registrationToken;
}
