import express from "express";

import {
  getUser,
  deleteUser,
  updateUser,
  getUsers,
} from "../controllers/user-controller.js";

const Router = express.Router();
Router.route("/user/:id").get(getUser).put(updateUser).delete(deleteUser);
Router.route("/users/").get(getUsers);

export default Router;
