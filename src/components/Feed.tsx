import Post from "@/components/Post";
import { prisma } from "@/prisma";

export default async function Feed() {
  const posts = await prisma.post.findMany();
  return (
    <div className="">
      {posts.map((post) => (
        <div key={post.id}>
          <Post />
        </div>
      ))}
    </div>
  );
}
