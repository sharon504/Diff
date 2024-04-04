import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  techStacks: [{ type: String, required: true }],
  requiredStacks: [{ type: String, required: true }],
  status: {
    type: String,
    required: true,
    enum: ["active", "completed", "archived"],
  },
  projectURL: { type: String, required: true },
  readmeFile: { type: String, required: true },
  contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  sponsorship: [
    {
      sponsor: { type: mongoose.Schema.Types.ObjectId, ref: "Sponsor" },
      amount: { type: Number, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
  ],
  vacancies: { type: String, required: false },
  applications: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        required: true,
        enum: ["pending", "accepted", "rejected"],
      },
    },
  ],
  summary: { type: String },
});

export default mongoose.model("projects", projectSchema);
