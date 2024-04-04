import mongoose, { Document } from "mongoose";

export const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  yearOfStudy: { type: Number, required: true },
  techStacks: { type: Array, required: true },
  projects: { type: Array, required: true },
  joinedAt: { type: Date, default: Date.now },
  qualifications: {
    resume: fileSchema,
    cv: fileSchema,
    portfolio: { type: String, required: false },
  },
  contact: {
    linkedin: { type: String, required: true },
    github: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
});

export default mongoose.model("users", userSchema);
