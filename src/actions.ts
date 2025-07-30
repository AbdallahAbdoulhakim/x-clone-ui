"use server";

import { auth } from "@clerk/nextjs/server";
import { getFileDetails } from "./utils/imagekitFile";
import { prisma } from "./prisma";

export const getIkImageDetails = async (imageId: string) => {
  const details = await getFileDetails(imageId);

  return {
    width: details.width,
    height: details.height,
    filePath: details.filePath,
    url: details.url,
    fileType: details.fileType,
    ...(details.customMetadata?.sensitive
      ? { customMetadata: { sensitive: details.customMetadata?.sensitive } }
      : {}),
  };
};

export const likePost = async (postId: string) => {
  const { userId } = await auth();

  if (!userId) return;

  const existingLike = await prisma.like.findFirst({
    where: {
      userId,
      postId,
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }
};

export const rePostPost = async (postId: string) => {
  const { userId } = await auth();

  if (!userId) return;

  const existingRePost = await prisma.post.findFirst({
    where: {
      rePostId: postId,
      userId,
    },
  });

  if (existingRePost) {
    await prisma.post.delete({
      where: {
        id: existingRePost.id,
      },
    });
  } else {
    await prisma.post.create({
      data: {
        userId,
        rePostId: postId,
      },
    });
  }
};

export const savePost = async (postId: string) => {
  const { userId } = await auth();

  if (!userId) return;

  const existingSave = await prisma.savedPost.findFirst({
    where: {
      userId,
      postId,
    },
  });

  if (existingSave) {
    await prisma.savedPost.delete({
      where: {
        id: existingSave.id,
      },
    });
  } else {
    await prisma.savedPost.create({
      data: {
        userId,
        postId,
      },
    });
  }
};
