import { StudentProfileModel } from "../models/models.js";
import ErrorHandler, { asyncErrorHandler } from "../middleware/middleware.js";
import { FileManager } from "../utils/utils.js";

const get_student_profile = asyncErrorHandler(async (req, res) => {
	const { filter } = req.filter;

	const student_profiles = await StudentProfileModel.find({ user_id: req.user_id }, filter);
	if (!student_profiles) {
		return next(new ErrorHandler(404, "Student profile not found"));
	}
	if (filter == ["cv"]) {
		const file = await FileModel.findOne({ user_id: req.user_id, filetype: "cv" });
		if (!file) {
			return next(new ErrorHandler(404, "File not found"));
		}
		req.file_name = file.filename;
		const downloadStream = FileManager.fileDownload(req, res, next);
		if (!downloadStream) {
			return next(new ErrorHandler(404, "File not found"));
		}
		return downloadStream(res);
	}
	}
		res.status(200).json({
			ok: true,
			message: "Student profile fetched successfully",
			data: { student_profile },
		});
});

const get_student_profiles = asyncErrorHandler(async (req, res) => {
	const { filter } = req.filter;

	const student_profiles = await StudentProfileModel.find({ user_id: req.user_id }, filter);
	if (!student_profiles) {
		return next(new ErrorHandler(404, "Student profile not found"));
	}
	res.status(200).json({
		ok: true,
		message: "Student profile fetched successfully",
		data: { student_profiles },
	});
});

const update_student_profile = asyncErrorHandler(async (req, res, next) => {
	const { _id } = req.user.id;
	const user_details = {
		year_of_study: req.body.year_of_study,
		description: req.body.description,
		tech_stacks: req.body.tech_stacks,
		projects: req.body.projects,
		cv: req.file_details,
		contact: req.body.contact,
	};
	const student_profile = await StudentProfileModel.findByIdAndUpdate(
		_id,
		user_details,
	);
	if (!student_profile) {
		return next(new ErrorHandler(404, "Student profile not found"));
	}
	res.status(200).json({
		ok: true,
		message: "Student profile updated successfully",
		data: null,
	});
});

const student_profile_controller = {
	get_student_profiles,
	update_student_profile,
};

export default student_profile_controller;
