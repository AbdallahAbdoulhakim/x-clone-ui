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
      take: LIMIT,
      skip: (page - 1) * LIMIT,
    }),
    prisma.post.count({ where: whereCondition }),
  ]);

  const hasMore = page * LIMIT < totalPosts;

  return Response.json({ posts, hasMore });
}
