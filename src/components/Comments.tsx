import Post from "@/components/Post";
import IkImage from "@/components/IkImage";

export default function Comments() {
  return (
    <div className="">
      <form className="flex items-center justify-between gap-4 p-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <IkImage
            path="general/avatar.png"
            alt="Wildy Rachik"
            w={100}
            h={100}
            tr={true}
          />
        </div>
        <input
          className="bg-transparent outline-none p-2 text-xl flex-1"
          type="text"
          placeholder="Post your reply..."
        />
        <button className="py-2 px-4 font-bold bg-white text-black rounded-full">
          Reply
        </button>
      </form>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
