import mongoose from "mongoose";
import { fileSchema } from "../models/user-model.js";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: false },
  description: { type: String, required: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  techStacks: [{ type: String, required: false }],
  status: {
    type: String,
    required: false,
    enum: ["active", "completed", "archived"],
  },
  projectURL: { type: String, required: false },
  readmeFile: { type: String, required: false },
  contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  sponsorship: [
    {
      sponsor: { type: mongoose.Schema.Types.ObjectId, ref: "sponsors" },
      amount: { type: Number, required: false },
      startDate: { type: Date, required: false },
      endDate: { type: Date, required: false },
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
});

export default mongoose.model("projects", projectSchema);
