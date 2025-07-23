import Comments from "@/components/Comments";
import IkImage from "@/components/IkImage";
import Post from "@/components/Post";
import Link from "next/link";

export default function PostPage() {
  return (
    <div className="">
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-black/75">
        <Link href="/">
          <IkImage path="icons/back.svg" alt="back" w={24} h={24} />
        </Link>
        <h1 className="font-bold text-lg">Post</h1>
      </div>
      <Post type="status" />
      <Comments />
    </div>
  );
}
