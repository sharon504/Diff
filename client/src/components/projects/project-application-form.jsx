import { useContext } from "react";
import { ProjectsContext } from "../../store/projects";
import axios from "axios";
const ProjectApplicationForm = () => {
  const [showConfirm, setShowConfirm] = useContext(ProjectsContext).showConfirm;
  const [projects, setProjects] = useContext(ProjectsContext).projects;
  const project = projects.find((project) => project._id === showConfirm[1]);
  const projectId = showConfirm[1];
  const onConfirm = () => {
    axios
      .put(`http://localhost:2000/api/v1/projects/${projectId}/`, {
        applications: [
          ...project.applications,
          {
            user: "660f77dd191cb0e2c20d59b0",
            status: "pending",
          },
        ],
      })
      .then((response) => {
        console.log(response.data);
        setShowConfirm([false, null]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 px-4 py-6 md:p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md mx-auto p-6">
        <h2 className="text-lg font-semibold mb-4">Data Sharing Consent</h2>
        <p className="text-gray-700 mb-4">
          By applying to this project, you are consenting to share your profile
          information with the project owner. This includes your username and
          any publicly available information on your profile.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-sm font-medium bg-gray-300 hover:bg-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => setShowConfirm(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onConfirm}
          >
            Apply and Share Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectApplicationForm;
