import React, { useState, useContext, useEffect } from "react";
import { SearchIcon, SortAsc, SortDesc, ChevronDownIcon } from "lucide-react";

import { ProjectsContext } from "../../store/projects";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useContext(ProjectsContext).projects;
  const [selectedTechStack, setSelectedTechStacks] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTechStackChange = (event) => {
    setSelectedTechStacks(event.target.value);
  };

  const filterProjects = async () => {
    const response = await axios.get(
      `http://localhost:2000/api/v1/projects?q=${searchTerm}&s=${selectedTechStack}`,
    );
    setProjects(response.data);
  };
  useEffect(() => {
    filterProjects();
  }, [searchTerm, selectedTechStack]);

  return (
    <div className="flex flex-wrap justify-between items-center w-full">
      <div className="flex flex-wrap  justify-center items-center gap-2 w-full mx-auto md:w-3/4 ">
        <div className="flex flex-shrink-0 gap-1 w-max p-2 items-center border rounded-full">
          <SearchIcon size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full outline-none "
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex flex-shrink-0 gap-1 w-max p-2 items-center border rounded-full">
          <SearchIcon size={16} className="text-gray-400" />
          <input
            onChange={handleTechStackChange}
            type="text"
            placeholder="Search stacks..."
            className="w-full outline-none "
            value={selectedTechStack}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
