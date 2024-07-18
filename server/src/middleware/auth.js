import { UserModel } from "../models/models.js";

import ErrorHandler, {
	asyncErrorHandler,
} from "../middleware/error-handler.js";

import jwt from "jsonwebtoken";

const authenticate = asyncErrorHandler(async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await UserModel.findById(decoded.id);
		if (!user) {
			return next(new ErrorHandler(401, "Unauthorized!"));
		}
		req.user = user;
		next();
	} catch (error) {
		next(new ErrorHandler(401, "Unauthorized!"));
	}
});
export { authenticate };
