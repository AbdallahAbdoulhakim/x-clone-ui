import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      {
        error: "Unauthenticated",
      },
      { status: 401 }
    );
  }

  const userProfileId = searchParams.get("user");
  const page = Number(searchParams.get("cursor"));
  const LIMIT = 3;

  const whereCondition =
    userProfileId !== "undefined"
      ? { parentPostId: null, userId: userProfileId as string }
      : {
          parentPostId: null,
          userId: {
            in: [
              userId,
              ...(
                await prisma.follow.findMany({
                  where: {
                    followerId: userId,
                  },
                  select: { followingId: true },
                })
              ).map((elt) => elt.followingId),
            ],
          },
        };

  const [posts, totalPosts] = await prisma.$transaction([
    prisma.post.findMany({
      where: whereCondition,
      include: {
        user: {
          select: {
            username: true,
            displayName: true,
            image: true,
          },
        },
        rePost: {
          include: {
            user: {
              select: {
                displayName: true,
                username: true,
                image: true,
              },
            },
            _count: { select: { likes: true, comments: true, rePosts: true } },
            likes: { where: { userId: userId }, select: { id: true } },
            rePosts: { where: { userId: userId }, select: { id: true } },
            comments: { where: { userId: userId }, select: { id: true } },
            saves: { where: { userId: userId }, select: { id: true } },
          },
        },
        _count: { select: { likes: true, rePosts: true, comments: true } },
        likes: { where: { userId: userId }, select: { id: true } },
        rePosts: { where: { userId: userId }, select: { id: true } },
        comments: { where: { userId: userId }, select: { id: true } },
        saves: { where: { userId: userId }, select: { id: true } },
      },
      take: LIMIT,
      skip: (page - 1) * LIMIT,
    }),
    prisma.post.count({ where: whereCondition }),
  ]);

  const hasMore = page * LIMIT < totalPosts;

  return Response.json({ posts, hasMore });
}
