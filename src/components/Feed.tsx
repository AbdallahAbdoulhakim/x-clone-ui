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
      <InfiniteFeed />
    </div>
  );
}
