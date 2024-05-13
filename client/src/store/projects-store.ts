import { atom } from "nanostores";

export type T_project = {
  _id: string;
  name?: string;
  description?: string;
  owner?: string;
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
};

export const projects = atom<T_project[]>([]);
export const addProject = (project: T_project) => {
  projects.set([...projects.get(), project]);
};

export const getProjects = () => {};

export const selectedProject = atom({});
