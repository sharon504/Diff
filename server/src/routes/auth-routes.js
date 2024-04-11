import express from "express";

import { createUser, signIn, signOut } from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.route("/signup").post(createUser);
authRouter.route("/signin").post(signIn);
authRouter.route("/signout").get(signOut);

export default authRouter;
