import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		minlength: [
			3,
			"Please enter a valid name that is at least 3 characters long",
		],
		validate: {
			validator: function (v) {
				return /^[a-zA-Z]+$/.test(v);
			},
			message: "Please enter a valid name that only contains English alphabets",
		},
		cast: "{VALUE} is not a valid {KIND}",
		required: [true, "Please enter your name"],
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		validate: {
			validator: function (v) {
				return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
			},
			message: "Please enter a valid email address",
		},
		cast: "{VALUE} is not a valid {KIND}",
		required: [true, "Please enter your email"],
		unique: true,
	},

	password: { type: String, required: true, select: false },
	username: {
		type: String,
		trim: true,
		minlength: [
			3,
			"Please enter a valid username that is at least 3 characters long",
		],
		cast: "{VALUE} is not a valid {KIND}",
		required: false,
	},
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "students",
		default: null,
	},
	sponsor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "sponsors",
		default: null,
	},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	// sessions: [],
});

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcryptjs.hash(this.password, 10);
});

UserSchema.methods.compare_password = async function (password) {
	return await bcryptjs.compare(password, this.password);
};

UserSchema.methods.get_access_token = function () {
	return jwt.sign(
		{ user_id: this._id, iat: Date.now() },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRY,
		},
	);
};

// UserSchema.methods.getRefreshToken = function () {
//   return jwt.sign(
//     { id: this._id, iat: Date.now() },
//     process.env.JWT_REFRESH_SECRET,
//     {
//       expiresIn: process.env.JWT_REFRESH_EXPIRY,
//     },
//   );
// };

UserSchema.methods.verify_token = function (token, type) {
	return jwt.verify(
		accessToken,
		type === "access" ? process.env.JWT_SECRET : process.env.JWT_REFRESH_SECRET,
	);
};

// UserSchema.methods.refreshAccessToken = function (refreshToken) {
// 	if (!jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)) return null;
// 	if (!this.sessions.filter((session) => session === refreshToken)) return null;
// 	//check if refresh token has expired
// 	const decoded = jwt.decode(refreshToken);
// 	if (decoded.exp < Date.now()) return null;
//
// 	return jwt.sign({ id: this._id, iat: Date.now() }, process.env.JWT_SECRET, {
// 		expiresIn: process.env.JWT_EXPIRY,
// 	});
// };

export default mongoose.model("users", UserSchema);
