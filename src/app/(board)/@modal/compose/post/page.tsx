"use client";
import IkImage from "@/components/IkImage";
import { useRouter } from "next/navigation";

export default function Modal() {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <div className="absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6] flex justify-center">
      <div className="py-4 px-8 rounded-xl bg-black w-[600px] h-max mt-12">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <button onClick={() => closeModal()} className="cursor-pointer">
            X
          </button>
          <div className="text-iconBlue font-bold">Drafts</div>
        </div>
        {/* CENTER */}
        <div className="py-8 flex gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <IkImage
              path="general/avatar.png"
              alt="Wildy Rachik"
              h={100}
              w={100}
              tr={true}
            />
          </div>

          <input
            className="flex-1 bg-transparent outline-none text-lg"
            type="text"
            placeholder="What is happening?"
          />
        </div>
        {/* BOTTOM */}
        <div className="flex items-center justify-between gap-4 flex-wrap border-t border-borderGray pt-4">
          <div className="flex gap-4 flex-wrap">
            <IkImage
              className="cursor-pointer"
              path="/icons/image.svg"
              alt=""
              w={20}
              h={20}
            />
            <IkImage
              className="cursor-pointer"
              path="/icons/gif.svg"
              alt=""
              w={20}
              h={20}
            />
            <IkImage
              className="cursor-pointer"
              path="/icons/poll.svg"
              alt=""
              w={20}
              h={20}
            />
            <IkImage
              className="cursor-pointer"
              path="/icons/emoji.svg"
              alt=""
              w={20}
              h={20}
            />
            <IkImage
              className="cursor-pointer"
              path="/icons/schedule.svg"
              alt=""
              w={20}
              h={20}
            />
            <IkImage
              className="cursor-pointer"
              path="/icons/location.svg"
              alt=""
              w={20}
              h={20}
            />
          </div>
          <button className="py-2 px-5 text-black bg-white rounded-full font-bold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
