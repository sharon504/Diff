import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  description: { type: String, required: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "project" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("sponsors", sponsorSchema);
