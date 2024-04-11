import React, { useContext } from "react";
import { ProjectsContext } from "../../store/projects";
import { ArrowLeft } from "lucide-react";

const ProjectDetailView = ({ projectId }) => {
  const [projects, setProjects] = useContext(ProjectsContext).projects;
  const [selected, setSelected] = useContext(ProjectsContext).selected;
  const project = projects.find((project) => project._id === projectId);
  const renderField = (label, value) =>
    value && (
      <div className="flex items-start ">
        <span className="text-gray-700 font-medium mr-2">{label}:</span>
        <span className="text-gray-500">{value}</span>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-7xl px-4 py-8">
      <div className="flex justify-between items-center gap-4 ">
        <button
          onClick={() => setSelected(null)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
        >
          <ArrowLeft />
        </button>
        <h2 className="w-full text-2xl text-center font-semibold">
          {project.name}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderField("Description", project.description)}
        {renderField("Owner", project.owner?.username)}
        {renderField("Tech Stacks", project.techStacks?.join(", "))}
        {renderField("Status", project.status)}
        {renderField("Project URL", project.projectURL)}
        {/* ... Conditional rendering for other project details */}
        {project.contributors?.length > 0 && (
          <div colSpan={2}>
            <h3 className="text-lg font-semibold mb-2">Contributors</h3>
            {project.contributors.constructor === Array && (
              <ul className="space-y-2">
                {project.contributors.map((contributor) => (
                  <li key={contributor._id} className="flex items-center">
                    <span className="text-gray-700">
                      {contributor.username}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {project.contributors.constructor === String && (
              <p className="flex items-center text-wrap overflow-hidden">
                <span className="text-gray-700">{project.contributors}</span>
              </p>
            )}
          </div>
        )}
        {project.vacancies?.length > 0 && (
          <div colSpan={2}>
            <h3 className="text-lg font-semibold mb-2">Vacancies</h3>
            <ul className="space-y-2">
              {project.vacancies.map((vacancy) => (
                <li key={vacancy}>{vacancy}</li>
              ))}
            </ul>
          </div>
        )}
        {project.applications?.length > 0 && (
          <div colSpan={2}>
            <h3 className="text-lg font-semibold mb-2">Applications</h3>
            <ul className="space-y-2">
              {project.applications.map((application) => (
                <li key={application._id} className="flex items-center">
                  <span className="text-gray-700">
                    {application.user?.username}
                  </span>
                  <span className="text-gray-500 ml-2">
                    ({application.status})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {project.summary && (
          <div colSpan={2}>
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="text-gray-700">{project.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailView;
