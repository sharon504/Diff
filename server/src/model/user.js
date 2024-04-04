import mongoose, { Document } from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  yearOfStudy: { type: Number, required: true },
  techStacks: { type: Array, required: true },
  projects: { type: Array, required: true },
  joinedAt: { type: Date, default: Date.now },
  qualifications: {
    resume: { type: String, required: true },
    cv: { type: String, required: true },
  },
  contact: {
    linkedin: { type: String, required: true },
    github: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
});

export default mongoose.model("User", userSchema);
