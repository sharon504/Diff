import mongoose from "mongoose";

class ErrorHandler extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
	}
}
const asyncErrorHandler = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};
const errorHandler = (err, req, res, next) => {
	let code = 500;
	let message = "Internal Server Error";
	console.log(err);
	if (err instanceof mongoose.Error.ValidationError) {
		const errors = Object.values(err.errors).map((element) => element.message);
		message = `Invalid input data. ${errors.join(". ")}`;
		code = 400;
	} else if (err instanceof mongoose.Error.CastError) {
		message = `Invalid input data. ${err.message}`;
		code = 400;
	} else if (err instanceof ErrorHandler) {
		message = err.message;
		code = err.code;
	}
	return res.status(code).json({ ok: false, message, data: null });
};

export default ErrorHandler;
export { errorHandler, asyncErrorHandler };
