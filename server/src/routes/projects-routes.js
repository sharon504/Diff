// routes concerning the projects model with POST, GET, PUT, DELETE methods

import { projects_controller } from "../controllers/controllers.js";

import express from "express";

const Router = express.Router();

Router.post("/projects", projects_controller.create_project);
Router.get("/projects", projects_controller.get_projects);
Router.put("/projects/:id", projects_controller.update_project);

export default Router;
