import React, { createContext, useState, useEffect } from "react";

import axios from "axios";

export const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/v1/projects/`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects: [projects, setProjects],
        form: [formVisible, setFormVisible],
        showConfirm: [showConfirm, setShowConfirm],
        selected: [selectedProject, setSelectedProject],
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
