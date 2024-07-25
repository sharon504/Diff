import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	name: { type: String, required: true },
	description: { type: String, required: false },
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
	},
	tech_stacks: [{ type: String, required: false }],
	status: {
		type: String,
		required: true,
		enum: ["active", "completed", "archived"],
	},
	project_url: { type: String, required: false },
	readme_file: { type: String, required: false },
	contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
	sponsorships: [
		{
			sponsor: { type: mongoose.Schema.Types.ObjectId, ref: "sponsors" },
			amount: { type: Number, required: false },
			start_date: { type: Date, required: false },
			end_date: { type: Date, required: false },
		},
	],
	vacancies: [{ type: String, required: false }],
	applications: [
		{
			user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
			status: {
				type: String,
				required: false,
				enum: ["pending", "accepted", "rejected"],
			},
		},
	],
	summary: { type: String },
	created_at: { type: Date, required: false, default: Date.now },
	updated_at: { type: Date, required: false, default: Date.now },
});

export default mongoose.model("projects", ProjectSchema);
