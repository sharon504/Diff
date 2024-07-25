import { ProjectModel, UserModel } from "../models/models.js";

import ErrorHandler, {
	asyncErrorHandler,
} from "../middleware/error-handler.js";

import generate_project_details from "../utils/utils.js";

const create_project = asyncErrorHandler(async (req, res) => {
	const user_data = {
		name: req.body.name,
		project_url: req.body.project_url,
	};
	const project_data = await fill_project_details(user_data["project_url"]);
	user_data["summary"] = project_data["summary"];
	user_data["description"] = project_data["description"];
	user_data["tech_stacks"] = project_data["tech_stacks"];
	const user = await UserModel.findById(req.user._id);
	if (!user) {
		return next(new ErrorHandler(404, "User not found"));
	}
	await fill_project_details(project);
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
	const user_data = {
		name: req.body.name,
		description: req.body.description,
		project_url: req.body.project_url,
		tech_stacks: req.body.tech_stacks,
		status: req.body.status,
		readme_file: req.body.readme_file,
		contributors: req.body.contributors,
		sponsorships: req.body.sponsorships,
		vacancies: req.body.vacancies,
		applications: req.body.applications,
		summary: req.body.summary,
	};

	const project = await ProjectModel.findOneAndUpdate(
		{
			user: req.user._id,
			_id: req.body.project_id,
		},
		user_data,
	);
	if (!project) {
		return next(new ErrorHandler(404, "Project not found"));
	}
	res.status(200).json({
		ok: true,
		message: "Project updated successfully",
		data: null,
	});
});

const projects_controller = { create_project, get_projects, update_project };

export default projects_controller;
