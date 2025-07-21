import Link from "next/link";
import PopularTags from "./PopularTags";
import Recommandations from "./Recommandations";
import Search from "./Search";

export default function RightBar() {
  return (
    <div className="pt-4 flex flex-col gap-4 sticky top-0 h-max">
      <Search />
      <PopularTags />
      <Recommandations />
      <div className="text-textGray text-sm flex gap-x-4 flex-wrap">
        <Link href="/">Terms of service</Link>
        <Link href="/">Privavy Policy</Link>
        <Link href="/">Cookie Policy</Link>
        <Link href="/">Accessibility</Link>
        <Link href="/">Ads Info</Link>
        <span>&copy; 2024 L corp.</span>
      </div>
    </div>
  );
}
