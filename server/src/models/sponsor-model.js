import mongoose from "mongoose";

const sponsoredProjectSchema = new mongoose.Schema({
	project_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "projects",
		required: true,
	},
});

const sponsorSchema = new mongoose.Schema({
	description: { type: String, required: true },
	sponsored_projects: [sponsoredProjectSchema],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
});

export default mongoose.model("sponsors", sponsorSchema);
