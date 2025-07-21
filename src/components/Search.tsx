import IkImage from "./IkImage";

export default function Search() {
  return (
    <div className="bg-inputGray flex py-2 px-4 items-center gap-4 rounded-full">
      <IkImage path="icons/explore.svg" alt="search" w={16} h={16} />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none placeholder:text-textGray"
      />
    </div>
  );
}
