"use client";

import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const res = await fetch("http://localhost:3000/api/posts");
  return res.json();
};

export default function InfiniteFeed({
  userProfileId,
}: {
  userProfile?: string;
}) {
  const posts = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
  console.log(posts);
  return <div className="">InfiniteFeed</div>;
}
