import { getCurrentUser } from "@/auth/current-user";
import { env } from "@/env";
import { db } from "@/server/db";
import { utapi } from "@/server/services/uploadthing";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  profileAvatarUploader: f({
    image: {
      maxFileSize: "256KB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await getCurrentUser();

      if (!user)
        throw new Error("Unauthorized", {
          cause: new UploadThingError("Unauthorized"),
        });

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const user = await db.user.findUnique({
        where: {
          id: metadata.userId,
        },
        select: {
          photo: true,
        },
      });

      if (!user)
        throw new Error("Unauthorized", {
          cause: new UploadThingError("Unauthorized"),
        });

      if (user.photo?.includes(env.UPLOADTHINGS_URL)) {
        const key = user.photo.split(env.UPLOADTHINGS_URL)[1];
        if (!key) return;
        void utapi.deleteFiles(key);
      }
      try {
        await db.user.update({
          where: {
            id: metadata.userId,
          },
          data: {
            photo: file.ufsUrl,
          },
        });
      } catch (err) {
        console.error(err);
        throw new Error("Coś poszło nie tak. Spróbuj ponownie.");
      }

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
