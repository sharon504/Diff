// routes concerning the projects model with POST, GET, PUT, DELETE methods

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projects-controller.js";

import express from "express";

const Router = express.Router();

Router.route("/projects").post(createProject).get(getProjects);
Router.route("/projects/:id").put(updateProject).delete(deleteProject);

export default Router;
