import React from "react";
import { searchQueryAtom, processProjects } from "@store/projects-store";
import { SearchIcon } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="w-1/2 px-4 flex gap-2 rounded-full border">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 text-gray-700 focus:outline-none"
        onChange={(e) => {
          searchQueryAtom.set({
            ...searchQueryAtom.get(),
            queryStr: e.target.value,
          });
          processProjects();
        }}
      />
      <button className="px-4 py-2 rounded-full">
        <SearchIcon size={24} />
      </button>
    </div>
  );
};

export default SearchBar;
