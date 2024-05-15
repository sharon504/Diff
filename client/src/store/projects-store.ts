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

export const projectsAtom = atom<T_project[]>([]);

export const setProjects = (projects: T_project[]) => {
  projectsAtom.set(projects);
};

export const getProjects = (): T_project[] => {
  return projectsAtom.get();
};

export const getProject = (id: string): T_project | null => {
  return projectsAtom.get().find((project) => project._id === id) || null;
};

export const selectedProject = atom<string | null>(null);

export enum E_sortOrder {
  ASC = "asc",
  DESC = "desc",
}
export const sortProjects = (
  projects: T_project[],
  sortBy: string,
  sortOrder: E_sortOrder,
) => {
  switch (sortOrder) {
    case E_sortOrder.ASC:
      if (sortBy === "name") {
        return projects?.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else if (sortBy === "createdAt") {
        return projects?.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
      } else if (sortBy === "modifiedAt") {
        return projects?.sort((a, b) => (a.modifiedAt > b.modifiedAt ? 1 : -1));
      }
      break;
    case E_sortOrder.DESC:
      if (sortBy === "name") {
        return projects?.sort((a, b) => (a.name < b.name ? 1 : -1));
      } else if (sortBy === "createdAt") {
        return projects?.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      } else if (sortBy === "modifiedAt") {
        return projects?.sort((a, b) => (a.modifiedAt < b.modifiedAt ? 1 : -1));
      }
      break;
  }
};

