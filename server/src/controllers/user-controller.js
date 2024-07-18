import { UserModel } from "../models/models.js";
import ErrorHandler, {
	asyncErrorHandler,
} from "../middleware/error-handler.js";

const get_users = asyncErrorHandler(async (req, res) => {
	const { filter } = req.filter;

	const users = await UserModel.find(filter);
	if (!users) {
		return next(new ErrorHandler(404, "User not found"));
	}
	res.status(200).json({
		ok: true,
		message: "User fetched successfully",
		data: { users },
	});
});

const update_user = asyncErrorHandler(async (req, res, next) => {
	const { _id } = req.user;
	const { username } = req.body;
	const user = await UserModel.findById(_id);
	if (!user) {
		return next(new ErrorHandler(404, "User not found"));
	}
	await UserModel.findByIdAndUpdate(_id, {
		username,
	});
	res.status(200).json({
		ok: true,
		message: "User updated successfully",
		data: null,
	});
});

const delete_user = asyncErrorHandler(async (req, res, next) => {
	// TODO: Implement delete user with cascade delete
});

const user_controller = { get_users, update_user };

export default user_controller;
