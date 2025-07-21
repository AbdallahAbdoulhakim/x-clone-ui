import IkImage from "@/components/IkImage";
import Link from "next/link";

const menuList = [
  {
    id: 1,
    name: "Homepage",
    link: "/",
    icon: "home.svg",
  },
  {
    id: 2,
    name: "Explore",
    link: "/",
    icon: "explore.svg",
  },
  {
    id: 3,
    name: "Notifications",
    link: "/",
    icon: "notification.svg",
  },
  {
    id: 4,
    name: "Messages",
    link: "/",
    icon: "message.svg",
  },
  {
    id: 5,
    name: "Bookmarks",
    link: "/",
    icon: "bookmark.svg",
  },
  {
    id: 6,
    name: "Jobs",
    link: "/",
    icon: "job.svg",
  },
  {
    id: 7,
    name: "Communities",
    link: "/",
    icon: "community.svg",
  },
  {
    id: 8,
    name: "Premium",
    link: "/",
    icon: "logo.svg",
  },
  {
    id: 9,
    name: "Profile",
    link: "/",
    icon: "profile.svg",
  },
  {
    id: 10,
    name: "More",
    link: "/",
    icon: "more.svg",
  },
];

export default function LeftBar() {
  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
      {/* LOGO MENU BUTTON */}
      <div className="flex flex-col gap-2 text-lg items-center 2xl:items-start">
        {/*  LOGO */}
        <Link href="/" className="p-2 rounded-full hover:bg-[#181818]">
          <IkImage path="icons/logo.svg" alt="logo" w={24} h={24} />
        </Link>

        {/* MENU LIST */}
        <div className="flex flex-col gap-2">
          {menuList.map((menuItem) => (
            <Link
              href={menuItem.link}
              key={menuItem.id}
              className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
            >
              <IkImage
                path={`/icons/${menuItem.icon}`}
                alt={menuItem.name}
                w={24}
                h={24}
              />
              <span className="hidden 2xl:inline">{menuItem.name}</span>
            </Link>
          ))}
        </div>

        {/* BUTTON POST */}

        <Link
          className="2xl:hidden bg-white text-black rounded-full w-12 h-12 flex items-center justify-center"
          href="/compose/post"
        >
          <IkImage path="/icons/post.svg" alt="new post" w={24} h={24} />
        </Link>
        <Link
          className="hidden 2xl:block bg-white text-black rounded-full font-bold py-2 px-20"
          href="/compose/post"
        >
          Post
        </Link>
      </div>

      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <IkImage
              path="/general/avatar.png"
              alt="Wildy Rachik"
              w={40}
              h={40}
              tr={true}
            />
          </div>
          <div className="hidden 2xl:flex flex-col">
            <span className="font-bold">Wildy Rachik</span>
            <span className="text-sm text-textGray">@wildyrachik</span>
          </div>
        </div>
        <div className="hidden 2xl:block cursor-pointer font-bold">...</div>
      </div>
    </div>
  );
}
