import Link from "next/link";
import IkImage from "./IkImage";

export default function PopularTags() {
  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      <h1 className="text-xl font-bold text-textGray">
        What&apos;s happening?
      </h1>
      {/* TRENDS EVENT */}
      <div className="flex gap-4">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden">
          <IkImage
            path="posts/nadalvFederer_zwvD3Jbz7.jpeg"
            alt="event"
            w={120}
            h={120}
            tr={true}
          />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-textGrayLight">
            Nadal v Federer Grand Slam
          </h2>
          <span className="text-sm text-textGray">Last Night</span>
        </div>
      </div>
      {/* TOPICS */}
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray font-bold text-sm">
            Technology + Trending
          </span>
          <IkImage path="icons/infoMore.svg" w={16} h={16} alt="info" />
        </div>
        <h2 className="text-textGrayLight font-bold">Open AI</h2>
        <span className="text-textGray text-sm">20K posts</span>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray font-bold text-sm">
            Technology + Trending
          </span>
          <IkImage path="icons/infoMore.svg" w={16} h={16} alt="info" />
        </div>
        <h2 className="text-textGrayLight font-bold">Open AI</h2>
        <span className="text-textGray text-sm">20K posts</span>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray font-bold text-sm">
            Technology + Trending
          </span>
          <IkImage path="icons/infoMore.svg" w={16} h={16} alt="info" />
        </div>
        <h2 className="text-textGrayLight font-bold">Open AI</h2>
        <span className="text-textGray text-sm">20K posts</span>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray font-bold text-sm">
            Technology + Trending
          </span>
          <IkImage path="icons/infoMore.svg" w={16} h={16} alt="info" />
        </div>
        <h2 className="text-textGrayLight font-bold">Open AI</h2>
        <span className="text-textGray text-sm">20K posts</span>
      </div>
      <Link href="/" className="text-iconBlue">
        Show more
      </Link>
    </div>
  );
}
