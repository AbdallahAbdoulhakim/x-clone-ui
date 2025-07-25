"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Post as PostType } from "@/generated/prisma";
import Post from "./Post";

const fetchPosts = async (pageParam: number, userProfileId?: string) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?cursor=${pageParam}&user=${userProfileId}`
  );
  return res.json();
};

export default function InfiniteFeed({
  userProfileId,
}: {
  userProfileId?: string;
}) {
  const { data, error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 2 }) => fetchPosts(pageParam, userProfileId),
    initialPageParam: 2,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 2 : undefined,
  });

  if (error) return <p>Something went wrong!</p>;
  if (status === "pending") return <p>Loading...</p>;

  const allPosts: PostType[] = data?.pages?.flatMap((page) => page.posts) || [];

  console.log(allPosts);

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h1>Posts are loading...</h1>}
      endMessage={<h1>All posts loaded!</h1>}
    >
      {allPosts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </InfiniteScroll>
  );
}
