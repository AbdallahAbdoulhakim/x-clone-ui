import Post from "@/components/Post";
import { Post as PostType } from "@/generated/prisma";

import IkImageFetcher from "./IkImageFetcher";

type Comment = PostType & {
  user: {
    displayName?: string | null | undefined;
    username: string;
    image: string | null;
  };
  _count: {
    likes: number;
    rePosts: number;
    comments: number;
  };
  likes: { id: string }[];
  rePosts: { id: string }[];
  comments: { id: string }[];
  saves: { id: string }[];
};

export default function Comments({
  comments,
  user,
  postId,
}: {
  comments: Comment[];
  user: { username: string; image: string };
  postId: string;
}) {
  console.log(postId);
  return (
    <div className="">
      <form className="flex items-center justify-between gap-4 p-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <IkImageFetcher id={user.image} />
        </div>
        <input
          className="bg-transparent outline-none p-2 text-xl flex-1"
          type="text"
          placeholder="Post your reply..."
        />
        <button className="py-2 px-4 font-bold bg-white text-black rounded-full">
          Reply
        </button>
      </form>
      {comments.map((comment) => (
        <Post key={comment.id} post={comment} type="comment" />
      ))}
    </div>
  );
}
