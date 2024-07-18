import { ProjectModel, UserModel } from "../models/models.js";

import ErrorHandler, {
	asyncErrorHandler,
} from "../middleware/error-handler.js";

const create_project = asyncErrorHandler(async (req, res) => {
	const {
		name,
		description,
		project_url,
		tech_stacks,
		status,
		readme_file,
		contributors,
		sponsorships,
		vacancies,
		applications,
		summary,
	} = req.body;
	const user = await UserModel.findById(req.user._id);
	if (!user) {
		return next(new ErrorHandler(404, "User not found"));
	}
	const project = await ProjectModel.create({
		name,
		description,
		project_url,
		tech_stacks,
		status,
		readme_file,
		contributors,
		sponsorships,
		vacancies,
		applications,
		summary,
	});
	res.status(201).json({
		ok: true,
		message: "Project created successfully",
		data: project,
	});
});

const get_projects = asyncErrorHandler(async (req, res) => {
	const { filter } = req.filter;
	const projects = await ProjectModel.find(filter);
	if (!projects) {
		return next(new ErrorHandler(404, "Project not found"));
	}
	res.status(200).json({
		ok: true,
		message: "Project fetched successfully",
		data: { projects },
	});
});

const update_project = asyncErrorHandler(async (req, res, next) => {
	const { name, description, project_url, tech_stacks, status } = req.body;

	const project = await ProjectModel.findOne({
		_id: req.params.id,
		user: req.user._id,
	});
	if (!project) {
		return next(new ErrorHandler(404, "Project not found"));
	}
	await ProjectModel.findByIdAndUpdate(project._id, {
		name,
		description,
		project_url,
		tech_stacks,
		status,
	});
	res.status(200).json({
		ok: true,
		message: "Project updated successfully",
		data: null,
	});
});

const projects_controller = { create_project, get_projects, update_project };

export default projects_controller;
