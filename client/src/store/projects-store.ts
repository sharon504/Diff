import { atom } from "nanostores";

export type T_project = {
  _id: string;
  name: string;
  description: string;
  owner: string;
  techStacks?: string[];
  status?: "active" | "completed" | "archived";
  projectURL?: string;
  readmeFile?: string;
  contributors?: string[];
  sponsorship?: {
    sponsor?: string;
    amount?: number;
    startDate?: Date;
    endDate?: Date;
  }[];
  vacancies?: string[];
  applications?: {
    user?: string;
    status?: "pending" | "accepted" | "rejected";
  }[];
  summary?: string;
  createdAt: Date;
  modifiedAt: Date;
};

export type T_sortOrder = "asc" | "desc";

export type T_searchQuery = {
  queryStr: string;
  filters: {
    techStacks?: string[];
    status?: "active" | "completed" | "archived";
  };
  sortBy: string;
  sortOrder: T_sortOrder;
};

export const projectsAtom = atom<T_project[]>([]);
export const processedProjectsAtom = atom<T_project[]>([]);
export const selectedProject = atom<string | null>(null);
export const searchQueryAtom = atom<T_searchQuery>({
  queryStr: "",
  filters: {
    techStacks: [],
    status: undefined,
  },
  sortBy: "name",
  sortOrder: "asc",
});

export const setProjects = (projects: T_project[]) => {
  projectsAtom.set(projects);
  processedProjectsAtom.set(projects);
};
export const getProjects = (): T_project[] => {
  return projectsAtom.get();
};
export const getProcessedProjects = (): T_project[] => {
  return processedProjectsAtom.get();
};
export const getProject = (id: string): T_project | null => {
  return projectsAtom.get().find((project) => project._id === id) || null;
};

const sortProjects = (
  projects: T_project[],
  sortBy: string,
  sortOrder: T_sortOrder,
): void => {
  switch (sortOrder) {
    case "asc":
      if (sortBy === "name") {
        projects?.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else if (sortBy === "createdAt") {
        projects?.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
      } else if (sortBy === "modifiedAt") {
        projects?.sort((a, b) => (a.modifiedAt > b.modifiedAt ? 1 : -1));
      }
      break;
    case "desc":
      if (sortBy === "name") {
        projects?.sort((a, b) => (a.name < b.name ? 1 : -1));
      } else if (sortBy === "createdAt") {
        projects?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      } else if (sortBy === "modifiedAt") {
        projects?.sort((a, b) => (a.modifiedAt < b.modifiedAt ? 1 : -1));
      }
      break;
  }
  processedProjectsAtom.set(projects);
};

const filterByQueryStrProjects = (projects: T_project[]): void => {
  const queryStr = searchQueryAtom.get().queryStr;
  if (queryStr) {
    const filteredProjects = projects.filter((project) =>
      project.name.toLowerCase().includes(queryStr.toLowerCase()),
    );
    processedProjectsAtom.set(filteredProjects);
  } else {
    processedProjectsAtom.set(projects);
  }
};

const filterProjects = (projects: T_project[]): void => {
  const filters = searchQueryAtom.get().filters;
  const filteredProjects = projects.filter((project) => {
    if (filters.techStacks) {
      return filters.techStacks.every((techStack) =>
        project.techStacks?.includes(techStack),
      );
    }
    if (filters.status) {
      return project.status === filters.status;
    }
    return true;
  });
  processedProjectsAtom.set(filteredProjects);
};

export const processProjects = (): void => {
  const projects = projectsAtom.get();
  filterByQueryStrProjects(projects);
  filterProjects(processedProjectsAtom.get());
  sortProjects(
    processedProjectsAtom.get(),
    searchQueryAtom.get().sortBy,
    searchQueryAtom.get().sortOrder,
  );
};
