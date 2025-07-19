"use client";

import IkImage from "@/components/IkImage";

export default function PostInfos() {
  return (
    <div className="cursor-pointer w-4 h-4 relative">
      <IkImage path="icons/infoMore.svg" w={16} h={16} alt="" tr={true} />
    </div>
  );
}
