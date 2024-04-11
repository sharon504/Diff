import { useContext, useEffect } from "react";
import { Github } from "lucide-react";

import { ProjectsContext } from "../../store/projects";

const ProjectCard = ({ project }) => {
  const { _id, name, description, techStacks, status, projectURL } = project;
  const [selected, setSelectedProject] = useContext(ProjectsContext).selected;
  const [showConfirm, setShowConfirm] = useContext(ProjectsContext).showConfirm;
  return (
    <div className="flex flex-col justify-between gap-4 p-3 bg-white border rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold ">{name}</h3>
            <p className="text-gray-700 ">{description}</p>
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
          {techStacks.map((tech) => (
            <li
              key={tech}
              className="text-gray-500 py-1 px-2 mr-2 rounded-full bg-gray-200"
            >
              {tech}
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
          <Github size={24} className="" />
          GitHub
        </a>{" "}
        <button
          onClick={() => setSelectedProject(_id)}
          className="flex px-4 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 ease-in-out duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View
        </button>
        <button
          onClick={() => setShowConfirm([true, _id])}
          className="flex px-4 py-1 rounded-full border border-green-500 text-green-500 hover:bg-green-500 ease-in-out duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

const ProjectsList = () => {
  const [projects, setProjects] = useContext(ProjectsContext).projects;
  return (
    <div className="grid gap-4 p-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      {projects &&
        projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
    </div>
  );
};

export default ProjectsList;
