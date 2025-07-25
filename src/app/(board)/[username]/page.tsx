import Feed from "@/components/Feed";
import IkImage from "@/components/IkImage";
import { prisma } from "@/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) return notFound();

  return (
    <div className="">
      {/* PROFILE TITLE */}
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-black/75">
        <Link href="/">
          <IkImage path="icons/back.svg" alt="back" w={24} h={24} />
        </Link>
        <h1 className="font-bold text-lg">Wildy Rachik</h1>
      </div>
      {/* INFO */}
      <div className="">
        {/* COVER AND AVATAR */}
        <div className="relative w-full">
          {/* COVER */}
          <div className="w-full aspect-[3/1]">
            <IkImage path="general/cover.jpg" alt="" w={600} h={200} />
          </div>
          {/* AVATAR */}
          <div className="w-1/5 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2 ">
            <IkImage
              path="general/avatar.png"
              alt=""
              w={100}
              h={100}
              tr={true}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-2 p-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <IkImage path="icons/more.svg" alt="more" w={20} h={20} />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <IkImage path="icons/explore.svg" alt="explore" w={20} h={20} />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <IkImage path="icons/message.svg" alt="message" w={20} h={20} />
          </div>
          <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
            Follow
          </button>
        </div>

        {/* USER DETAILS */}

        <div className="p-4 flex flex-col gap-2">
          {/* USERNAME & HANDLE */}
          <div className="">
            <h1 className="text-2xl font-bold">Wildy Rachik</h1>
            <span className="text-textGray text-sm">@wildyrachik</span>
          </div>
          <p>Lama Dev Youtube Channel</p>
          {/* JOB & LOCATION 1  */}
          <div className="flex gap-4 text-textGray text-[15px]">
            <div className="flex items-center gap-2">
              <IkImage
                path="icons/userLocation.svg"
                alt="location"
                w={20}
                h={20}
              />
              <span className="">USA</span>
            </div>
            <div className="flex items-center gap-2">
              <IkImage path="icons/date.svg" alt="date" w={20} h={20} />
              <span className="">Joined May 2011</span>
            </div>
          </div>
          {/*  FOLLOWING & FOLLOWS */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span>100</span>
              <span className="text-textGray text-[15px]">Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <span>100</span>
              <span className="text-textGray text-[15px]">Followings</span>
            </div>
          </div>
        </div>
      </div>
      {/* FEED */}
      <Feed userProfileId={user.id} />
    </div>
  );
}
