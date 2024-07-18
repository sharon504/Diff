import express from "express";

import { user_controller } from "../controllers/controllers.js";

const Router = express.Router();

Router.get("/users", user_controller.get_users);
Router.put("/users", user_controller.update_user);

export default Router;
