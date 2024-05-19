import mongoose, { Document } from "mongoose";

export const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: false },
  yearOfStudy: { type: Number, required: false },
  techStacks: { type: Array, required: false },
  projects: { type: Array, required: false },
  joinedAt: { type: Date, default: Date.now },
  qualifications: {
    resume: fileSchema,
    cv: fileSchema,
    portfolio: { type: String, required: false },
  },
  contact: {
    linkedin: { type: String, required: false },
    github: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
  },
});

export default mongoose.model("users", userSchema);
