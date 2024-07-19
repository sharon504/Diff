import ErrorHandler from "../middleware/error-handler.js";

const get_access_token = async (user, status_code, res) => {
	const access_token = user.get_access_token();

	if (!access_token) {
		return next(new ErrorHandler(500, "Error generating access token"));
	}

	res.status(status_code).json({
		ok: true,
		message: "Signed in successfully",
		data: { access_token },
	});
};

const clear_access_token = async (user, req, res) => {
	res
		.status(200)
		.json({ ok: true, message: "Signed out successfully", data: null });
};

const token_handler = { get_access_token, clear_access_token };

export default token_handler;
