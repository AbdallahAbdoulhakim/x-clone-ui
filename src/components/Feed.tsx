import Post from "@/components/Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import InfiniteFeed from "@/components//InfiniteFeed";

export default async function Feed({
  userProfileId,
}: {
  userProfileId?: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

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

  const posts = await prisma.post.findMany({
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
    take: 3,
    skip: 0,
    orderBy: { createdAt: "desc" },
  });

  // FETCH POSTS
  return (
    <div className="">
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
      <InfiniteFeed userProfileId={userProfileId} />
    </div>
  );
}
