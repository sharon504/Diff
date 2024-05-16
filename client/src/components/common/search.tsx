import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import {
  availableTechStacksAtom,
  searchQueryAtom,
  processProjects,
} from "@store/projects-store";
import { FilterIcon } from "lucide-react";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const $availableTechStacks = useStore(availableTechStacksAtom);

  const $searchQuery = useStore(searchQueryAtom);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTechStackChange = (techStack: string, checked: boolean) => {
    const currentTechStacks = searchQueryAtom.get().filters.techStacks;
    const updatedTechStacks = checked
      ? [...currentTechStacks, techStack]
      : currentTechStacks.filter((stack: string) => stack !== techStack);

    searchQueryAtom.set({
      ...searchQueryAtom.get(),
      filters: {
        ...searchQueryAtom.get().filters,
        techStacks: updatedTechStacks,
      },
    });

    processProjects();
  };

  return (
    <div className="w-1/2 px-4 flex items-center gap-2 rounded-full border relative">
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
      <div className="relative">
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
          onClick={toggleDropdown}
        >
          <FilterIcon size={20} />
        </button>
        {isDropdownOpen && (
          <div className="w-max h-max absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10 ">
            <div className="px-4 py-2 font-bold">Tech Stacks</div>
            <div className="h-48 p-2 grid grid-cols-2 gap-3 border-t border-gray-200 overflow-y-scroll">
              {$availableTechStacks.map((techStack: string, index: number) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={techStack}
                    checked={searchQueryAtom
                      .get()
                      .filters.techStacks.includes(techStack)}
                    onChange={(e) =>
                      handleTechStackChange(techStack, e.target.checked)
                    }
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <label
                    htmlFor={techStack}
                    className="ml-2 block text-sm leading-5 text-gray-700 cursor-pointer"
                  >
                    {techStack}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
