import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { studentProfileController } from "../controllers/controllers.js";
import { FileManager, ROLES } from "../utils/utils.js";
import { authorize } from "../middleware/middleware.js";

const Router = express.Router();
const connection = mongoose.connection;

connection.on("open", () => {
	bucket = new mongoose.mongo.GridFSBucket(connection.db);
	storage = multer.memoryStorage();
	upload = multer({ storage });

	Router.route("/student-profile").post(
		upload.single("file"),
		FileManager.fileUpload,
		studentProfileController.create_profile,
	);
});

Router.route("/get-student-profile").post(
	studentProfileController.get_student_profiles,
);

export default Router;
