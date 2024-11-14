import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
const f = createUploadthing();

export const ourFileRouter = {
  avatar: f({
    image: { maxFileSize: "512KB" },
  })
    .middleware(async () => {
      const { user } = await validateRequest();

      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const student = await prisma.student.findUnique({
        where: {
          userId: metadata.user.id,
        },
        select: {
          id: true,
          avatarUrl: true,
        },
      });

      if (!student) {
        throw new Error("Student not found");
      }

      const oldAvatarUrl = student.avatarUrl;
      if (oldAvatarUrl) {
        const key = oldAvatarUrl.split(
          `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`
        )[1];

        await new UTApi().deleteFiles(key);
      }

      const newAvatarUrl = file.url.replace(
        "/f/",
        `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`
      );

      await prisma.student.update({
        where: {
          id: student.id,
        },
        data: {
          avatarUrl: newAvatarUrl,
        },
      });
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof ourFileRouter;
