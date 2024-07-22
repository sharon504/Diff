import { UserModel } from "../models/models.js";
import { token_handler } from "../utils/utils.js";
import ErrorHandler, {
	asyncErrorHandler,
} from "../middleware/error-handler.js";

const sign_up = asyncErrorHandler(async (req, res, next) => {
	const { email, password, name } = req.body;
	const existing_user = await UserModel.findOne({ email: email });
	if (existing_user) {
		return next(new ErrorHandler(400, "User already exists"));
	}
	await UserModel.create({ email, password, name });
	return res.status(201).json({ message: "User created" });
});

const sign_in = asyncErrorHandler(async (req, res, next) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email: email }).select("+password");
	if (!user || !(await user.compare_password(password))) {
		return next(new ErrorHandler(401, "Invalid credentials"));
	}
	return await token_handler.get_access_token(user, 200, res);
});

const sign_out = async (req, res) => {
	token_handler.clear_access_token(req.user, req, res);
};

const forgot_password = async (req, res) => {
	//TODO: Implement forgot password
};

const reset_password = async (req, res) => {
	//TODO: Implement reset password
};

const auth_controller = { sign_up, sign_in, sign_out };

export default auth_controller;
