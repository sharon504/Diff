import express from "express";

import { createUser, signIn, signOut } from "../controllers/auth-controller.js";

const Router = express.Router();

Router.route("/signup").post(createUser);
Router.route("/signin").post(signIn);
Router.route("/signout").get(signOut);

export default Router;
