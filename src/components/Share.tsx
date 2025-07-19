"use client";

import IKImage from "@/components/IkImage";
import { handleUpload } from "@/utils/imagekit";
import { useState, useRef, FormEvent } from "react";

export default function Share() {
  const [media, setMedia] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpload(fileInputRef);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex gap-4">
      {/* AVATAR */}

      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <IKImage path="general/avatar.png" alt="" w={100} h={100} tr={true} />
      </div>
      {/* OTHERS */}
      <div className="flex-1 flex flex-col gap-4">
        <input
          className="bg-transparent outline-none placeholder:text-textGray text-xl"
          type="text"
          name="description"
          placeholder="What's happening?"
        />
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <input
              id="file"
              name="file"
              className="hidden"
              accept="image/*"
              type="file"
              ref={fileInputRef}
              onChange={handleMediaChange}
            />
            <label htmlFor="file">
              <IKImage
                className="cursor-pointer"
                path="/icons/image.svg"
                alt=""
                w={20}
                h={20}
              />
            </label>

            <IKImage
              className="cursor-pointer"
              path="/icons/gif.svg"
              alt=""
              w={20}
              h={20}
            />
            <IKImage
              className="cursor-pointer"
              path="/icons/poll.svg"
              alt=""
              w={20}
              h={20}
            />
            <IKImage
              className="cursor-pointer"
              path="/icons/emoji.svg"
              alt=""
              w={20}
              h={20}
            />
            <IKImage
              className="cursor-pointer"
              path="/icons/schedule.svg"
              alt=""
              w={20}
              h={20}
            />
            <IKImage
              className="cursor-pointer"
              path="/icons/location.svg"
              alt=""
              w={20}
              h={20}
            />
          </div>
          <button className="bg-white text-black font-bold rounded-full py-2 px-4 cursor-pointer">
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
