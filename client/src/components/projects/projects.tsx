import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { projects, type T_project, addProject } from "@store/projects-store";

const ProjectCard = ({ project }: { project: T_project }) => {
  const { _id, name, description, techStacks, status, projectURL } = project;
  return (
    <div className="h-96 flex flex-col justify-between gap-4 p-3 bg-white border rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold ">{name}</h3>
            <p className="text-gray-700">{description}</p>
          </div>
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

        <ul className="flex flex-wrap  gap-2 ">
          {techStacks.slice(0, 5).map((techstack: string) => (
            <li
              key={techstack}
              className="text-gray-500 py-1 px-2 mr-2 rounded-full bg-gray-200"
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
          className="flex gap-1 px-4 py-1 rounded-full border border-black hover:bg-neutral-900 hover:text-white ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
        >
          GitHub
        </a>{" "}
        <button className="flex px-4 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 ease-in-out duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          View
        </button>
        <button className="flex px-4 py-1 rounded-full border border-green-500 text-green-500 hover:bg-green-500 ease-in-out duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Apply
        </button>
      </div>
    </div>
  );
};
const Projects = () => {
  const $projects = useStore(projects);
  const fetchProjects = async () => {
    const response = await fetch("http://localhost:2000/api/v1/projects");
    const projects = await response.json();
    projects.map((project: T_project) => {
      addProject(project);
    });
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div>
      <h1>Projects</h1>
      <ul className="grid gap-4 md:grid-cols-3">
        {$projects.map((project: T_project) => (
          <li key={project._id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
