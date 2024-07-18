import mongoose from "mongoose";

export const fileSchema = new mongoose.Schema({
	name: { type: String, required: false },
	data: { type: Buffer, required: false },
	content_type: { type: String, required: false },
});

const studentSchema = new mongoose.Schema({
	year_of_study: { type: Number, required: false },
	tech_stacks: { type: Array, required: false },
	projects: { type: Array, required: false },
	qualifications: {
		resume: fileSchema,
		cv: fileSchema,
	},
	contact: {
		portfolio_url: { type: String, required: false },
		linkedin: { type: String, required: false },
		github: { type: String, required: false },
		phone: { type: String, required: false },
		email: { type: String, required: false },
	},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	// sessions: [],
});

export default mongoose.model("students", studentSchema);
