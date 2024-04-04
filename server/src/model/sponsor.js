import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sponsorDescription: { type: String, required: true },
  sponsoredProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

export default mongoose.model("sponsors", sponsorSchema);
