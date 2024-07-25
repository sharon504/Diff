import { v4 as uuidv4 } from "uuid";
import ErrorHandler, { asyncErrorHandler } from "../middleware/middleware.js";
import { FileUpload } from "../utils/utils.js";
import { Readable } from "stream";
import { FileModel } from "../models/models.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const fileDownload = async (req, res, next) => {
	const { bucket, storage, upload } = FileUpload;
	try {
		if (!req.file_name) return res.status(204).json({ error: "No CV found!" });
		let fileName = req.file_name;
		let downloadStream = bucket.openDownloadStreamByName(fileName);

		downloadStream.on("file", (file) => {
			res.set("Content-Type", file.contentType);
		});

		downloadStream.on("error", (err) => {
			return undefined;
		});
		return downloadStream;
	} catch (err) {
		return undefined;
	}
};

const fileUpload = asyncErrorHandler(async (req, res, next) => {
	const { bucket, storage, upload } = FileUpload;
	let buffer;
	let file_name;
	let filetype = req.body.filetype;
	let file;
	let uidName;
	let mimetype;
	if (req.file) {
		file = req.file;
		mimetype = file.mimetype;
		buffer = file.buffer;
		uidName = uuidv4() + "." + file.originalname.split(".")[1];
	} else if (req.file_name && req.buffer) {
		buffer = req.buffer;
		file_name = req.file_name;
		mimetype = "application/pdf";
	} else {
		return next();
	}
	let fileName;
	fileName = req.file_name ? req.file_name : uidName;

	if (req.url.includes("profile-picture")) {
		if (!["png", "jpg", "jpeg"].includes(fileName.split(".")[1])) {
			return new ErrorHandler(400, "Invalid filetype");
		}
		mimetype = "image/" + fileName.split(".")[1];
		filetype = "profile_picture";
	} else {
		if (!["pdf"].includes(fileName.split(".")[1])) {
			return new ErrorHandler(400, "Invalid filetype");
		}
		mimetype = "application/pdf";
		filetype = "cv";
	}
	let previousFileDetails = await FileModel.findOne({ user_id: req.user_id });
	if (previousFileDetails) {
		let oldFileId = previousFileDetails.fileId;
		let oldFileType = previousFileDetails.filetype;

		if (oldFileType == filetype) {
			fileName = previousFileDetails.filename;
			mongoose.connection.db.collection("fs.files").deleteOne({
				_id: new ObjectId(oldFileId),
			});
			mongoose.connection.db.collection("fs.chunks").deleteMany({
				files_id: new ObjectId(oldFileId),
			});
		}
	}

	let uploadStream = bucket.openUploadStream(fileName);
	let readBuffer = new Readable();
	readBuffer.push(buffer);
	readBuffer.push(null);

	const isUploaded = await new Promise((resolve, reject) => {
		readBuffer
			.pipe(uploadStream)
			.on("finish", resolve("successfull"))
			.on("error", reject("error occured while creating stream"));
	});
	let newFile = FileModel.findOneAndUpdate(
		{
			filename: fileName,
			contentType: mimetype,
			length: buffer.length,
			filetype: filetype,
			fileId: uploadStream.id,
		},
		{ upsert: true },
	);

	if (!newFile) {
		return next(new ErrorHandler(400, "error occured while saving our work"));
	}
	req.file_details = newFile._conditions ? newFile._conditions : newFile;
	if (!req.file_name) {
		return next();
	}
});

const FileManager = { fileDownload, fileUpload };
export default FileManager;
