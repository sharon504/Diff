import mongoose from "mongoose";
import { fileSchema } from "./user.js";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  techStacks: [{ type: String, required: true }],
  status: {
    type: String,
    required: true,
    enum: ["active", "completed", "archived"],
  },
  projectURL: { type: String, required: true },
  readmeFile: fileSchema,
  contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  sponsorship: [
    {
      sponsor: { type: mongoose.Schema.Types.ObjectId, ref: "sponsors" },
      amount: { type: Number, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
  ],
  vacancies: [{ type: String, required: false }],
  applications: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
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
