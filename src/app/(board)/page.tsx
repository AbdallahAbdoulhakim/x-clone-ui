import Feed from "@/components/Feed";
import Share from "@/components/Share";

import Link from "next/link";

export default async function Home() {
  return (
    <div className="">
      <div className="px-4 pt-4 flex justify-between text-textGray font-bold border-b-[1px] border-textGray ">
        <Link
          className=" pb-3 flex items-center border-b-4 border-iconBlue"
          href="/"
        >
          For you
        </Link>
        <Link className="pb-3 flex  items-center" href="/">
          Following
        </Link>
        <Link className=" pb-3 hidden md:flex items-center" href="/">
          React.js
        </Link>
        <Link className=" pb-3 hidden md:flex items-center" href="/">
          Javascript
        </Link>
        <Link className=" pb-3 hidden md:flex items-center" href="/">
          CSS
        </Link>
      </div>
      <Share />
      <Feed />
    </div>
  );
}
