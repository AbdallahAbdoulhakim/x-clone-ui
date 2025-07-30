import Link from "next/link";
import IkImage from "@/components/IkImage";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import IkImageFetcher from "./IkImageFetcher";

export default async function Recommandations() {
  const { userId } = await auth();

  if (!userId) return;

  const followingIds = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followedUserIds = followingIds.map((f) => f.followingId);

  const friendRecommendations = await prisma.user.findMany({
    where: {
      id: { not: userId, notIn: followedUserIds },
      followings: { some: { followerId: { in: followedUserIds } } },
    },
    take: 3,
    select: {
      id: true,
      username: true,
      image: true,
      displayName: true,
    },
  });

  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      {/* USER CARDS */}
      {friendRecommendations.map((friend) => (
        <div key={friend.id} className="flex items-center justify-between">
          {/* IMAGE AND USER INFO */}
          <div className="flex items-center gap-2">
            <div className="relative rounded-full overflow-hidden w-10 h-10">
              <IkImageFetcher
                id={friend.image || "68871a075c7cd75eb8e2a2d4"}
                h={100}
                w={100}
                tr={true}
              />
            </div>
            <div className="">
              <h1 className="text-md font-bold">{friend.displayName}</h1>
              <span className="text-textGray text-sm">@{friend.username}</span>
            </div>
          </div>
          {/* BUTTON */}
          <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
            Follow
          </button>
        </div>
      ))}

      <Link className="text-iconBlue" href="/">
        Show More
      </Link>
    </div>
  );
}
