import React, { useState, useContext } from "react";
import { ProjectsContext } from "../../store/projects";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const ProjectCreateForm = () => {
  const [formVisible, setFormVisible] = useContext(ProjectsContext).form;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [techStacks, setTechStacks] = useState([]);
  const [status, setStatus] = useState("active"); // Set default status
  const [projectURL, setProjectURL] = useState("");
  // ... other state variables for remaining project fields (readmeFile, contributors, sponsorship, vacancies, applications, summary)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const projectData = {
      name,
      description,
      techStacks,
      status,
      projectURL,
      // ... other project data based on state variables
    };

    try {
      const response = await axios.post(
        "http://localhost:2000/api/v1/projects",
        projectData,
      );
      setFormVisible(false);
      console.log("Project created successfully:", response.data);

      // Handle successful submission (e.g., clear form, display confirmation message)
    } catch (error) {
      console.error("Error creating project:", error);
      // Handle errors (e.g., display error message to user)
    }
  };

  const handleTechStackChange = (event) => {
    const newTechStacks = Array.from(
      event.target.selectedOptions,
      (option) => option.value,
    );
    setTechStacks(newTechStacks);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex justify-between items-center gap-4">
        <ArrowLeft onClick={() => setFormVisible(false)} />
        <h1 className="w-full text-2xl font-bold text-center text-gray-800">
          Create a New Project
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-full">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status:
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-full">
            <label
              htmlFor="projectURL"
              className="block text-sm font-medium text-gray-700"
            >
              Project URL:
            </label>
            <input
              type="url"
              id="projectURL"
              value={projectURL}
              onChange={(e) => setProjectURL(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          {/* ... Form fields for other project details (readmeFile, contributors, sponsorship, vacancies, applications, summary) */}
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default ProjectCreateForm;
