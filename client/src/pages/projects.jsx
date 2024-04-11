import { useContext } from "react";
import { ProjectsContext } from "../store/projects";
import { PlusIcon } from "lucide-react";
import {
  ProjectDetailView,
  ProjectsList,
  SearchBar,
  ProjectCreateForm,
  ProjectApplicationForm,
} from "../components/components.js";

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] =
    useContext(ProjectsContext).selected;
  const [formVisible, setFormVisible] = useContext(ProjectsContext).form;
  const [showConfirm, setShowConfirm] = useContext(ProjectsContext).showConfirm;
  return (
    <div className="flex flex-col gap-4 w-full h-full p-4">
      {!selectedProject && !showConfirm[0] && !formVisible && (
        <>
          <div className="flex gap-4">
            <SearchBar />
            <button
              onClick={() => setFormVisible(true)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
            >
              <PlusIcon size={24} />
            </button>
          </div>
          <ProjectsList />
        </>
      )}
      {showConfirm[0] && <ProjectApplicationForm />}
      {selectedProject && <ProjectDetailView projectId={selectedProject} />}
      {formVisible && <ProjectCreateForm />}
    </div>
  );
};

export default ProjectsPage;
