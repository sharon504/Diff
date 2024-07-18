import express from "express";

import { auth_controller } from "../controllers/controllers.js";
import { authenticate } from "../middleware/auth.js";

const Router = express.Router();

Router.post("/signup", auth_controller.sign_up);
Router.post("/signin", auth_controller.sign_in);
Router.post("/signout", authenticate, auth_controller.sign_out);

export default Router;
