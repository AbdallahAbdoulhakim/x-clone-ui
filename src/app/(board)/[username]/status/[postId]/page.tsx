import Comments from "@/components/Comments";
import IkImage from "@/components/IkImage";
import Post from "@/components/Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string; username: string }>;
}) {
  const { postId, username } = await params;
  const { userId } = await auth();

  if (!userId) return;

  const [post, user] = await prisma.$transaction([
    prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            username: true,
            displayName: true,
            image: true,
          },
        },
        _count: { select: { likes: true, rePosts: true, comments: true } },
        likes: { where: { userId: userId }, select: { id: true } },
        rePosts: { where: { userId: userId }, select: { id: true } },
        saves: { where: { userId: userId }, select: { id: true } },
        comments: {
          include: {
            user: {
              select: {
                username: true,
                displayName: true,
                image: true,
              },
            },
            _count: { select: { likes: true, rePosts: true, comments: true } },
            likes: { where: { userId: userId }, select: { id: true } },
            rePosts: { where: { userId: userId }, select: { id: true } },
            comments: { where: { userId: userId }, select: { id: true } },
            saves: { where: { userId: userId }, select: { id: true } },
          },
        },
      },
    }),

    prisma.user.findFirst({ where: { id: userId }, select: { image: true } }),
  ]);

  if (!post) {
    return notFound();
  }

  return (
    <div className="">
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-black/75">
        <Link href="/">
          <IkImage path="icons/back.svg" alt="back" w={24} h={24} />
        </Link>
        <h1 className="font-bold text-lg">Post</h1>
      </div>
      <Post post={post} type="status" />
      <Comments
        comments={post.comments}
        user={{
          username: username,
          image: user?.image || "68871a075c7cd75eb8e2a2d4",
        }}
        postId={postId}
      />
    </div>
  );
}
