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

  const whereCondition = userProfileId
    ? { parentPostId: null, userId: userProfileId }
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

  const posts = await prisma.post.findMany({ where: whereCondition });

  return Response.json(posts);
}
