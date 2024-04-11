import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const fileSchema = new mongoose.Schema({
    name: { type: String, required: false },
    data: { type: Buffer, required: false },
    contentType: { type: String, required: false },
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: false },
    name: { type: String, required: false },
    password: { type: String, required: false, select: false },
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

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("users", userSchema);
