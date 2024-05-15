import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  projectsAtom,
  type T_project,
  setProjects,
} from "@store/projects-store";

const ProjectCard = ({ project }: { project: T_project }) => {
  const { _id, name, description, techStacks, status, projectURL } = project;
  return (
    <div className="h-96 p-3 flex flex-col justify-between gap-4 bg-white border rounded-lg shadow-md overflow-hidden hover:scale-[1.02] ease-in-out duration-500">
      <div className="h-full flex flex-col justify-between gap-4">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex justify-between gap-2">
            <h3 className="text-xl font-bold">{name}</h3>
            <span
              className={`h-max text-sm font-semibold px-4 py-1 rounded-full ${
                status === "active"
                  ? "bg-green-100 text-green-800"
                  : status === "completed"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {status}
            </span>
          </div>
          <p className="max-h-48 overflow-y-hidden text-gray-700">
            {description}
          </p>
        </div>

        <ul className="flex flex-wrap gap-2">
          {techStacks.slice(0, 5).map((techstack: string) => (
            <li
              key={techstack}
              className="min-w-12 px-2 py-1 text-center text-gray-500 rounded-full bg-gray-200"
            >
              {techstack}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center">
        <a
          href={projectURL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-1 px-4 py-1 rounded-full border border-black hover:bg-neutral-900 hover:text-white ease-in-out duration-300 focus:outline-none"
        >
          GitHub
        </a>{" "}
        <button className="flex px-4 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 ease-in-out duration-300 hover:text-white focus:outline-none">
          View
        </button>
        <button className="flex px-4 py-1 rounded-full border border-green-500 text-green-500 hover:bg-green-500 ease-in-out duration-300 hover:text-white focus:outline-none">
          Apply
        </button>
      </div>
    </div>
  );
};
const ProjectsGallery = () => {
  const $projectsAtom = useStore(projectsAtom);
  const fetchProjects = async () => {
    const response = await fetch("http://localhost:2000/api/v1/projects");
    const projects = await response.json();
    setProjects(projects);
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div>
      <h1>Projects</h1>
      <ul className="grid gap-4 md:grid-cols-3">
        {$projectsAtom.map((project: T_project) => (
          <li key={project._id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsGallery;
