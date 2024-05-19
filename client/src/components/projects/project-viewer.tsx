import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { type T_project, projectsAtom } from "@store/projects-store";
import { ArrowLeftIcon } from "lucide-react";

const ProjectViewer = ({ projectId }: { projectId: string }) => {
  const [project, setProject] = useState<T_project | null>(null);
  const { _id, name, description, techStacks, status, projectURL, summary } =
    project || ({} as T_project);
  const fetchProject = async () => {
    const response = await fetch(
      `http://localhost:2000/api/v1/projects/${projectId}`,
    );
    const data: T_project = await response.json();
    setProject(data);
  };
  useEffect(() => {
    fetchProject();
  }, []);
  return (
    <div className="w-full h-screen p-8 flex flex-col justify-start gap-4">
      <div className="flex items-center gap-2">
        <a href="/projects">
          <ArrowLeftIcon size={24} />
        </a>
        <h1 className="text-3xl font-bold">{name}</h1>
      </div>
      <div className="h-full flex gap-4">
        <div className="w-2/3 h-full flex flex-col border rounded-lg">
          <p className="p-4 prose-lg ">{description}</p>
        </div>
        <div className="w-1/3 p-4 flex flex-col justify-between border rounded-lg">
          <ul className="flex flex-wrap gap-2">
            {techStacks?.map((techstack: string) => (
              <li
                key={techstack}
                className="min-w-12 px-2 py-1 text-center text-gray-500 rounded-full bg-gray-200"
              >
                {techstack}
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center gap-4">
            <a
              href={projectURL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full gap-1 px-4 py-1 rounded-full border border-black text-center hover:bg-neutral-900 hover:text-white ease-in-out duration-300 focus:outline-none"
            >
              GitHub
            </a>{" "}
            <button className="w-full gap-1 px-4 py-1 rounded-full border border-black text-center hover:bg-neutral-900 hover:text-white ease-in-out duration-300 focus:outline-none">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewer;
