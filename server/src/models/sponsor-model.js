import mongoose from "mongoose";

const sponsoredProjectSchema = new mongoose.Schema({});

const sponsorSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	description: { type: String, required: true },
	sponsored_projects: [
		{
			project_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "projects",
				required: true,
			},
		},
	],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

export default mongoose.model("sponsors", sponsorSchema);
